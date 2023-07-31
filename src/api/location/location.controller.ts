import { LocationService } from "@src/api/location/location.service.js";
import { Request, Response } from "express";

const { searchLocations, saveLocation, getLocations, deleteLocation } = new LocationService();

export class LocationController {
    async searchLocations(req: Request, res: Response) {
        try {
            const { code, resource } = await searchLocations(<string>req.query.q);
            return res.status(code).send(resource);
        } catch (e) {
            return res.status(e.code).send({ message: e.message });
        }
    }

    async saveLocation(req: Request, res: Response) {
        try {
            const { code, message } = await saveLocation(<string>req.headers.authorization, req.body);
            return res.status(code).send({ message: message });
        } catch (e) {
            return res.status(e.code).send({ message: e.message });
        }
    }

    async getLocations(req: Request, res: Response) {
        try {
            const { code, resource } = await getLocations(<string>req.headers.authorization);
            return res.status(code).send(resource);
        } catch (e) {
            return res.status(e.code).send({ message: e.message });
        }
    }

    async deleteLocation(req: Request, res: Response) {
        try {
            const { code, message } = await deleteLocation(<string>req.headers.authorization, req.params.id);
            return res.status(code).send({ message: message });
        } catch (e) {
            return res.status(e.code).send({ message: e.message });
        };
    };
};