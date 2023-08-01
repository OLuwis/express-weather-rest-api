import "dotenv/config";
import axios from "axios";
import jsonwebtoken, { Secret } from "jsonwebtoken";
import { LocationHelper } from "@location/location.helper.js";
import { locationRepo } from "@src/db.js";

axios.defaults.baseURL = "https://api.openweathermap.org";

type geoType = { name: string, country: string, state: string, lat: number, lon: number };
type forecastType = { dt: number; weather: { main: string; description: string; }; main: { temp: number; temp_min: number; temp_max: number; feels_like: number; pressure: number; humidity: number; grnd_level: number; }; visibility: number; wind: { speed: number; deg: number; gust: number; }; clouds: { all: number; }; };

const { format } = new LocationHelper();

export class LocationService {
    async searchLocations(query: string) {
        if (!query) throw { code: 400, message: "No Search Terms Found!" };
        const { data } = await axios.get(`/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.API_KEY}`);
        const resource = new Array();
        data.map((obj: geoType) => {
            const newObj = {
                data: {
                    city: obj.name,
                    state: obj.state,
                    country: obj.country,
                    lat: obj.lat,
                    lon: obj.lon
                },
                ref: {
                    weather: {
                        method: "GET",
                        url: `/api/locations/weather?lat=${obj.lat}&lon=${obj.lon}`
                    },
                    forecast: {
                        method: "GET",
                        url: `/api/locations/forecast?lat=${obj.lat}&lon=${obj.lon}`
                    },
                    save: {
                        header: "Authorization Bearer jwt-token",
                        method: "POST",
                        url: "/api/locations",
                        body: {
                            city: obj.name,
                            state: obj.state,
                            country: obj.country,
                            lat: obj.lat,
                            lon: obj.lon
                        }
                    }
                }
            };
            resource.push(newObj);
        });
        return { code: 200, resource: resource };
    };

    async saveLocation( token: string, { city, state, country, lat, lon }: { city: string, state: string|undefined, country: string, lat: number, lon: number }) {
        if (!token) throw { code: 401, message: "Not Authorized!" };
        const newToken = format(token);
        const { user_id } = <{user_id: number}>jsonwebtoken.verify(newToken, <Secret>process.env.SECRET);
        if (!user_id) throw { code: 401, message: "Not Authorized!" };
        const newLocation = locationRepo.create({
            user_id: user_id,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lon: lon
        });
        await locationRepo.insert(newLocation);
        return { code: 201, message: "Location Saved!" };
    };

    async getLocations(token: string) {
        if (!token) throw { code: 401, message: "Not Authorized!" };
        const newToken = format(token);
        const { user_id } = <{user_id: number}>jsonwebtoken.verify(newToken, <Secret>process.env.SECRET);
        if (!user_id) throw { code: 401, message: "Not Authorized!" };
        const userLocations = await locationRepo.findBy({
            user_id: user_id
        });
        const resource = new Array();
        userLocations.map(location => {
            const newObj = {
                data: {
                    location_id: location.location_id,
                    city: location.city,
                    state: location.state,
                    country: location.country,
                    lat: location.lat,
                    lon: location.lon
                },
                ref: {
                    weather: {
                        method: "GET",
                        url: `/api/locations/weather?lat=${location.lat}&lon=${location.lon}`
                    },
                    forecast: {
                        method: "GET",
                        url: `/api/locations/forecast?lat=${location.lat}&lon=${location.lon}`
                    },
                    delete: {
                        header: "Authorization Bearer jwt-token",
                        method: "DELETE",
                        url: `/api/locations/${location.location_id}`
                    }
                }
            }
            resource.push(newObj);
        });
        return { code: 200, resource: resource };
    };

    async deleteLocation(token: string, id: string) {
        if (!token) throw { code: 401, message: "Not Authorized!" };
        const newToken = format(token);
        const { user_id } = <{user_id: number}>jsonwebtoken.verify(newToken, <Secret>process.env.SECRET);
        if (!user_id) throw { code: 401, message: "Not Authorized!" };
        const location = await locationRepo.findOneBy({ location_id: parseInt(id) });
        if (!location) throw { code: 404, message: "Not Found!" };
        await locationRepo.delete({ location_id: parseInt(id) });
        return { code: 404, message: "Location Deleted!" };
    };

    async getWeather (lat: string, lon: string) {
        const { data } = await axios.get(`/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`);
        if (!data) throw { code: 500, message: "Unable To Get Weather!" };
        const resource = {
            city: data.name,
            country: data.sys.country,
            weather: {
                main: data.weather[0].main,
                description: data.weather[0].description
            },
            temp: {
                main: data.main.temp,
                min: data.main.temp_min,
                max: data.main.temp_max,
                feels_like: data.main.feels_like,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                grnd_level: data.main.grnd_level
            },
            visibility: data.visibility,
            wind: {
                speed: data.wind.speed,
                deg: data.wind.deg,
                gust: data.wind.gust
            },
            clouds: {
                all: data.clouds.all
            },
            time: {
                date: data.dt,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
                timezone: data.timezone
            }
        };
        return { code: 200, resource: resource };
    }

    async getForecast (lat: string, lon: string) {
        const { data } = await axios.get(`/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`);
        if (!data) throw { code: 500, message: "Unable To Get Weather!" };
        const newArray = new Array();
        data.list.map((data: forecastType) => {
            const newObj = {
                date: data.dt,
                weather: {
                    main: data.weather.main,
                    description: data.weather.description
                },
                temp: {
                    main: data.main.temp,
                    min: data.main.temp_min,
                    max: data.main.temp_max,
                    feels_like: data.main.feels_like,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    grnd_level: data.main.grnd_level
                },
                visibility: data.visibility,
                wind: {
                    speed: data.wind.speed,
                    deg: data.wind.deg,
                    gust: data.wind.gust
                },
                clouds: {
                    all: data.clouds.all
                }
            }
            newArray.push(newObj);
        });
        const resource = {
            city: data.city.name,
            country: data.city.country,
            time: {
                sunrise: data.city.sunrise,
                sunset: data.city.sunset,
                timezone: data.city.timezone
            },
            forecast: newArray
        };
        console.log(resource);
        return { code: 200, resource: resource };
    }
};