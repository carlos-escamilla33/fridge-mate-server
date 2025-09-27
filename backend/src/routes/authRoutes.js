const express = require("express");
const authRouter = express.Router();
const {register, login} = require("../controllers/authController");
const {authenticateToken} = require("../middleware/auth");

authRouter.use((req, res, next) => {
    console.log("A request has been made to /auth");

    next();
});

authRouter.post("/register", register);
authRouter.login("/login", login);

module.exports = {
    authRouter
}