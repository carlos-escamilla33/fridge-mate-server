const express = require("express");
const authRouter = express.Router();
const {register, login, forgotPassword} = require("../controllers/authController");
const {authenticateToken} = require("../middleware/authToken");

authRouter.use((req, res, next) => {
    console.log("A request has been made to /auth");

    next();
});

authRouter.post("/register", register);
authRouter.login("/login", login);
authRouter.forgotPassword("/forgot-password", forgotPassword);

module.exports = {
    authRouter
}