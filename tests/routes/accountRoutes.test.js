const request = require("supertest");
const app = require("../../app");
const {pool} = require("../../src/database/config/database");

describe("API Account Routes", () => {

    beforeAll(async () => {
        await pool.query("TRUNCATE TABLE account CASCADE");
    });

    afterAll(async () => {
        await pool.end();
    });

    describe("POST /api/auth/register", () => {
        test("should register a new user", async () => {
            const res = await request(app)
                .post("/api/auth/register")
                .send({
                    account_name: "Riley's Fridge",
                    first_name: "Riley",
                    last_name: "Escamilla",
                    email: "Rileyrolls1@gmail.com",
                    password: "Rileyrolls1"
                });
            expect(res.status).toBe(201);
            expect(res.body.message).toMatch(/You Successfully Registered!/);
            expect(res.body).toHaveProperty("account");
            expect(res.body).toHaveProperty("profile");
            expect(res.body.account.email).toMatch(/Rileyrolls1@gmail.com/);
        });
    });

    describe("POST /api/auth/login", () => {
        test("should login a user with an existing account", async () => {
            const res = await request(app)
                .post("/api/auth/login")
                .send({
                    email: "Rileyrolls1@gmail.com",
                    password: "Rileyrolls1"
                });

            expect(res.status).toBe(200);
            expect(res.body.message).toMatch(/You Successfully Logged In!/);
            expect(res.body).toHaveProperty("account");
            expect(res.body).toHaveProperty("accessToken");
            expect(res.body).toHaveProperty("refreshToken");
            expect(res.body.account.email).toMatch(/Rileyrolls1@gmail.com/);
        });
    });

});