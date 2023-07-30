import { app } from "@src/app.js";
import { AppDataSource } from "@src/db.js";
import request from "supertest";

describe("GET /api/locations/search?q=", () => {
    beforeAll(() => {

    });

    afterAll(() => {

    });

    describe("GIVEN a city name", () => {
        it("should THEN return a status code 200 and an array of objects containing city names", async () => {
            const response = await request(app).get("/api/locations/search?q=Salvador");
            expect(response.statusCode).toBe(200);
            expect(typeof response.body).toBe("Array");
            expect(response.body[0]).toHaveProperty("name", "Salvador");
        });
    });
});

describe("POST /api/locations", () => {
    beforeAll(() => {

    });

    afterAll(() => {

    });

    describe("GIVEN a city data", () => {
        it("should THEN return a status code 201 and a 'Location Saved!' message", async () => {
            const response = await request(app).post("/api/locations").send({
                name: "Salvador",
                lat: -12.9822499,
                lon: -38.4812772,
                country: "BR",
                state: "Bahia"
            });
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe("Location Saved!");
        });
    });
});

describe("GET /api/locations/:id", () => {
    describe("GIVEN an user id", () => {
        it("should THEN if authenticated return a status code 200 and an array of saved locations", async () => {
            
        });
    });
});

describe("GET /api/locations/weather?lat=&lon=", () => {
    describe("", () => {
        it("", async () => {

        });
    });
});

describe("GET /api/locations/weather?lat=&lon=", () => {
    describe("", () => {
        it("", async () => {

        });
    });
});