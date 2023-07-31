import { Router } from "express";
import { LocationController } from "@location/location.controller.js";

export const locationRouter = Router();
const { searchLocations, saveLocation, getLocations, deleteLocation } = new LocationController();

locationRouter.get("/api/locations/search", searchLocations);
locationRouter.post("/api/locations", saveLocation);
locationRouter.get("/api/locations", getLocations);
locationRouter.delete("/api/locations/:id", deleteLocation);