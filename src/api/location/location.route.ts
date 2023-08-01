import { Router } from "express";
import { LocationController } from "@location/location.controller.js";

export const locationRouter = Router();
const { searchLocations, saveLocation, getLocations, deleteLocation, getWeather, getForecast } = new LocationController();

locationRouter.get("/api/locations/search", searchLocations);
locationRouter.post("/api/locations", saveLocation);
locationRouter.get("/api/locations", getLocations);
locationRouter.delete("/api/locations/:id", deleteLocation);
locationRouter.get("/api/locations/weather", getWeather);
locationRouter.get("/api/locations/forecast", getForecast);