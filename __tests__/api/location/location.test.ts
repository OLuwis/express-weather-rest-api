import request from "supertest";
import { app } from "@src/app.js";
import jsonwebtoken from "jsonwebtoken";
import { AuthService } from "@auth/auth.service.js";
import { AppDataSource, locationRepo, userRepo } from "@src/db.js";

describe("GET /api/locations/search?q=", () => {
    describe("GIVEN a city name", () => {
        it("should THEN return a status code 200 and an array of objects with multiple keys", async () => {
            const { statusCode, body } = await request(app).get("/api/locations/search?q=Salvador");
            expect(statusCode).toBe(200);
            for (let i = 0; i < body - 1; i++) {
                expect(body[i].data).toHaveProperty("city");
                expect(body[i].data).toHaveProperty("state");
                expect(body[i].data).toHaveProperty("country");
                expect(body[i].data).toHaveProperty("lat");
                expect(body[i].data).toHaveProperty("lon");
                expect(body[i].ref).toHaveProperty("weather");
                expect(body[i].ref).toHaveProperty("forecast");
                expect(body[i].ref).toHaveProperty("save");
            };
        });
    });

    describe("GIVEN no search terms", () => {
        it("should THEN return a status code 400 and 'No Search Terms Found!'", async () => {
            const response = await request(app).get("/api/locations/search?q=");
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("No Search Terms Found!");
        });
    });
});

describe("POST /api/locations", () => {
    const bodyObj = {
        city: "Salvador",
        state: "Bahia",
        country: "BR",
        lat: -12.98,
        lon: -38.48
    };
    
    beforeAll(async () => {
        await AppDataSource.initialize();
        const authService = new AuthService();
        await authService.signup({ username: "username", password: "password" });
    });

    afterAll(async () => {
        const userTest = await userRepo.findOneBy({ username: "username" });
        await locationRepo.delete({ user_id: userTest?.user_id });
        await userRepo.delete({ username: "username" });
        await AppDataSource.destroy();
    });

    describe("GIVEN a location data from an authenticated user", () => {
        it("should THEN return a status code 201 and 'Location Saved!'", async () => {
            const auth = await request(app).post("/api/auth/login").send({ username: "username", password: "password" });
            const { statusCode, body } = await request(app).post("/api/locations").send(bodyObj).set("Authorization", `Bearer ${auth.body.token}`);
            expect(statusCode).toBe(201);
            expect(body.message).toBe("Location Saved!");
        });
    });
    
    describe("GIVEN a unauthorized user request", () => {
        it("should THEN return a status code 401 and 'Not Authorized!'", async () => {
            const { statusCode, body } = await request(app).post("/api/locations").send(bodyObj);
            expect(statusCode).toBe(401);
            expect(body.message).toBe("Not Authorized!");
        });
    });
});

describe("GET /api/locations", () => {
    const bodyObj = {
        city: "Salvador",
        state: "Bahia",
        country: "BR",
        lat: -12.98,
        lon: -38.48
    };
    
    beforeAll(async () => {
        await AppDataSource.initialize();
        const authService = new AuthService();
        await authService.signup({ username: "username", password: "password" });
    });

    afterAll(async () => {
        const userTest = await userRepo.findOneBy({ username: "username" });
        await locationRepo.delete({ user_id: userTest?.user_id });
        await userRepo.delete({ username: "username" });
        await AppDataSource.destroy();
    });
    
    describe("GIVEN an request from authenticated user", () => {
        it("should THEN return a status code 200 and an array of objects with multiple keys", async () => {
            const auth = await request(app).post("/api/auth/login").send({ username: "username", password: "password" });
            await request(app).post("/api/locations").send(bodyObj).set("Authorization", `Bearer ${auth.body.token}`);
            const { statusCode, body } = await request(app).get("/api/locations").set("Authorization", `Bearer ${auth.body.token}`);
            expect(statusCode).toBe(200);
            for (let i = 0; i < body.length; i++) {
                expect(body[i].data).toHaveProperty("location_id");
                expect(body[i].data).toHaveProperty("city");
                expect(body[i].data).toHaveProperty("state");
                expect(body[i].data).toHaveProperty("country");
                expect(body[i].data).toHaveProperty("lat");
                expect(body[i].data).toHaveProperty("lon");
                expect(body[i].ref).toHaveProperty("weather");
                expect(body[i].ref).toHaveProperty("forecast");
                expect(body[i].ref).toHaveProperty("delete");
            };
        });    
    });
});

describe("DELETE /api/locations/:id", () => {
    const bodyObj = {
        city: "Salvador",
        state: "Bahia",
        country: "BR",
        lat: -12.98,
        lon: -38.48
    };
    
    beforeAll(async () => {
        await AppDataSource.initialize();
        const authService = new AuthService();
        await authService.signup({ username: "username", password: "password" });
    });

    afterAll(async () => {
        await userRepo.delete({ username: "username" });
        await AppDataSource.destroy();
    });

    describe("GIVEN a location id", () => {
        it("should THEN return a status code 204 and 'Location Deleted!'", async () => {
            const auth = await request(app).post("/api/auth/login").send({ username: "username", password: "password" });
            const { user_id } = <{ user_id: number }>jsonwebtoken.decode(auth.body.token);
            await request(app).post("/api/locations").send(bodyObj).set("Authorization", `Bearer ${auth.body.token}`);
            const testLocation = await locationRepo.findOneBy({ user_id: user_id });
            const { statusCode, body } = await request(app).delete(`/api/locations/${testLocation?.location_id}`).set("Authorization", `Bearer ${auth.body.token}`);
            expect(statusCode).toBe(404);
            expect(body.message).toBe("Location Deleted!");
        });
    });
});

describe("GET /api/locations/weather?lat=&lon=", () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });
    
    describe("GIVEN a latitude and longitude", () => {
        it("should THEN return a status code 200 and an object with weather data", async () => {
            const response = await request(app).get("/api/locations/weather?lat=-12.98&-38.48");

        });
    });
});

describe("GET /api/locations/forecast?lat=&lon=", () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });
    
    describe("GIVEN a latitude and longitude", () => {
        it("should THEN return a status code 200 and an array of object with weather data", async () => {

        });
    });
});