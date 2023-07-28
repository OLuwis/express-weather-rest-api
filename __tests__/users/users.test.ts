import { app } from "@src/app.js";
import AppDataSource from "@src/db.js";
import request from "supertest";

describe("POST /user/signup", () => {
    beforeAll(async () => await AppDataSource.initialize());
    
    afterAll(async () => await AppDataSource.destroy());
    
    describe("GIVEN a user and password", () => {
        const bodyMock = { username: "testUser", password: "testPassword" };
        it("should THEN send 201 status code and user data in body", async () => {
            const response = await request(app).post("/user/signup").send(bodyMock);
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe(`${bodyMock.username} Created!`);
        });
    });
    describe("GIVEN only a username/password", () => {
        const bodyMock = { username: "testUser", password: "" };
        it("should THEN send 400 status code and 'Information Is Missing!' message", async () => {
            const response = await request(app).post("/user/signup").send(bodyMock);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Information Is Missing!");
        });
    });
    describe("GIVEN a small password", () => {
        const bodyMock = { username: "testUser", password: "test" };
        it("should THEN send 400 status code and 'Passwords Must Have At Least 8 Characters!' message", async () => {
            const response = await request(app).post("/user/signup").send(bodyMock);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Passwords Must Have At Least 8 Characters!");
        });
    });
    describe("GIVEN a username already registered", () => {
        const bodyMock = { username: "repeatedUser", password: "testPassword" };
        it("should THEN send 409 status code and 'Username Already Registered!' message", async () => {
            const response = await request(app).post("/user/signup").send(bodyMock);
            expect(response.statusCode).toBe(409);
            expect(response.body.message).toBe("Username Already Registered!");
        });
    });
});