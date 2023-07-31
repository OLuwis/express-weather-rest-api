import { app } from "@src/app.js";
import { AuthService } from "@auth/auth.service.js";
import { userRepo } from "@src/db.js";
import { AppDataSource } from "@src/db.js";
import request from "supertest";
import jsonwebtoken from "jsonwebtoken";

describe("POST /api/auth/signup", () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });
    
    afterAll(async () => {
        await userRepo.delete({ username: "username" });
        await AppDataSource.destroy();
    });
    
    describe("GIVEN a user and password", () => {
        it("should THEN send 201 status code and user data in body", async () => {
            const response = await request(app).post("/api/auth/signup").send({ username: "username", password: "password" });
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe("username Created!");
        });
    });

    describe("GIVEN only a username/password", () => {
        it("should THEN send 400 status code and 'Information Is Missing!'", async () => {
            const response = await request(app).post("/api/auth/signup").send({ username: "username", password: "" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Information Is Missing!");
        });
    });
    
    describe("GIVEN a small password", () => {
        it("should THEN send 400 status code and 'Passwords Must Have At Least 8 Characters!'", async () => {
            const response = await request(app).post("/api/auth/signup").send({ username: "username", password: "word" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Passwords Must Have At Least 8 Characters!");
        });
    });

    describe("GIVEN a username already registered", () => {
        it("should THEN send 409 status code and 'Username Already Registered!' message", async () => {
            const response = await request(app).post("/api/auth/signup").send({ username: "username", password: "password" });
            expect(response.statusCode).toBe(409);
            expect(response.body.message).toBe("Username Already Registered!");
        });
    });
});

describe("POST /api/auth/login", () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        const authService = new AuthService();
        await authService.signup({ username: "username", password: "password" });
    });
    
    afterAll(async () => {
        await userRepo.delete({ username: "username" });
        await AppDataSource.destroy();
    });

    describe("GIVEN only a username/password", () => {
        it("should THEN send 400 status code and 'Information Is Missing!' message", async () => {
            const bodyMock = { username: "username", password: "" };
            const response = await request(app).post("/api/auth/signup").send(bodyMock);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Information Is Missing!");
        });
    });
    
    describe("GIVEN a small password", () => {
        it("should THEN send 400 status code and 'Passwords Must Have At Least 8 Characters!' message", async () => {
            const bodyMock = { username: "username", password: "word" };
            const response = await request(app).post("/api/auth/signup").send(bodyMock);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Passwords Must Have At Least 8 Characters!");
        });
    });
    
    describe("GIVEN a correct username and password", () => {
        it("should THEN send 200 status code and token on body", async () => {
            const bodyMock = { username: "username", password: "password" };
            const response = await request(app).post("/api/auth/login").send(bodyMock);
            expect(response.statusCode).toBe(200);
            const jwtPayload = <{ username: string }>jsonwebtoken.decode(response.body.token);
            expect(jwtPayload.username).toBe(bodyMock.username);
        });
    });

    describe("GIVEN a wrong password", () => {
        const bodyMock = { username: "username", password: "wrongPassword" };
        it("should THEN send 401 status code and 'Wrong Password!' message", async() => {
            const response = await request(app).post("/api/auth/login").send(bodyMock);
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Wrong Password!");
        });
    });

    describe("GIVEN a wrong user", () => {
        const bodyMock = { username: "username2", password: "password" };
        it("should THEN send 401 status code and 'Username Not Found!' message", async() => {
            const response = await request(app).post("/api/auth/login").send(bodyMock);
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Username Not Found!");
        });
    });
});
