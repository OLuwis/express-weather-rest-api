import { app } from "@src/app.js";
import request from "supertest";

describe("GIVEN POST /auth/signup", () => {
    describe("WHEN it has user and password", () => {
        const testBody = { user: "testUser", password: "testPassword" };
        
        it("should THEN send 201 status code", async () => {
            const response = await request(app).post("/auth/signup").send(testBody);
            expect(response.statusCode).toBe(201);
        });

        it("should THEN send user data in body", async () => {
            const response = await request(app).post("/auth/signup").send(testBody);
            expect(response.body.user).toBe(testBody.user);
        });
    });
    
    describe("WHEN it has only user/password", () => {
        const testBody = { user: "testUser", password: "" };

        it("should THEN send 400 status code", async () => {
            const response = await request(app).post("/auth/signup").send(testBody);
            expect(response.statusCode).toBe(400)
        });

        it("should THEN send 'Information Missing!'", async () => {
            const response = await request(app).post("/auth/signup").send(testBody);
            expect(response.body.message).toBe("Information Missing!")
        });
    });

    describe("WHEN it has small password", () => {
        const testBody = { user: "testUser", password: "" };

        it("should THEN send 400 status code", async () => {
            const response = await request(app).post("/auth/signup").send(testBody);
            expect(response.statusCode).toBe(400);
        });

        it("should THEN send 'Passwords Must Have At Least 8 Characters!'", async () => {
            const response = await request(app).post("/auth/signup").send(testBody);
            expect(response.body.message).toBe("Passwords Must Have At Least 8 Characters!")
        });
    });
});