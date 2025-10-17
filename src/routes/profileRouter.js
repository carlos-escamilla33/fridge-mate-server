const express = require("express");
const profileRouter = express.Router();
const {authenticateToken} = require("../middleware/authToken");

profileRouter.use((req, res, next) => {
    console.log("A request has been made to /accounts");
    next();
});

profileRouter.get("/profiles", authenticateToken, getAllAccountProfiles);