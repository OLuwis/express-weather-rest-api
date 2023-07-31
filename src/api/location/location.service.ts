import "dotenv/config";
import axios from "axios";
import jsonwebtoken, { Secret } from "jsonwebtoken";
import { LocationHelper } from "@location/location.helper.js";
import { locationRepo } from "@src/db.js";

axios.defaults.baseURL = "https://api.openweathermap.org";

type geoType = { name: string, country: string, state: string, lat: number, lon: number };

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
};