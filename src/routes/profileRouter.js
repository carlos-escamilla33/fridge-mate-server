const express = require("express");
const profileRouter = express.Router();
const {authenticateToken} = require("../middleware/authToken");
const {getAllAccountProfiles} = require("../controllers/profilesController");

profileRouter.use((req, res, next) => {
    console.log("A request has been made to /profiles");
    next();
});

profileRouter.get("/", authenticateToken, getAllAccountProfiles);

module.exports = {
    profileRouter
}