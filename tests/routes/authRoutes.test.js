const request = require("supertest");
const app = require("../../app");
const {pool} = require("../../src/database/config/database");
const { findAccountById } = require("../../src/database/models/accountModel");

describe("API Auth Routes", () => {
    let accId;
    let refreshToken;
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
            accId = res.body.account.account_id;
            refreshToken = res.body.refreshToken;
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

    describe("POST /api/auth/forgot-password", () => {
        test("should send an email to an existing account for password reset", async () => {
            const res = await request(app)
                .post("/api/auth/forgot-password")
                .send({
                    email: "Rileyrolls1@gmail.com"
                });
            expect(res.status).toBe(200);
            expect(res.body.message).toMatch(/If an account exists with that email, a reset link has been sent./);
        });
    });

    describe("POST /api/auth/reset-password", () => {
        test("should reset the user's password", async () => {
            acc = await findAccountById(accId);
            
            expect(acc).toBeDefined();
            expect(acc).toHaveProperty("reset_token");

            const res = await request(app)
                .post("/api/auth/reset-password")
                .send({
                    email: acc.email,
                    newPassword: "RileyRules1",
                    resetToken: acc.reset_token
                });

            expect(res.status).toBe(200);
            expect(res.body.message).toMatch(/Password reset successfully!/);
        });
    });

    describe("POST /api/auth/refresh", () => {
        test("should refresh access token", async () => {
            const res = await request(app)
                .post("/api/auth/refresh")
                .send({
                    refreshToken
                });
            
            expect(res.status).toBe(200);
            expect(res).toBeDefined();
            expect(res.body.message).toMatch(/Successfully refreshed accessToken/);
            expect(res.body.accessToken).toBeDefined();
        });
    })
});