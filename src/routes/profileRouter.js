const express = require("express");
const profileRouter = express.Router();
const {authenticateToken} = require("../middleware/authToken");
const {getAllAccountProfiles, getSingleProfile, updateProfileName} = require("../controllers/profilesController");

profileRouter.use((req, res, next) => {
    console.log("A request has been made to /profiles");
    next();
});

profileRouter.get("/", authenticateToken, getAllAccountProfiles);
profileRouter.get("/:id", authenticateToken, getSingleProfile);
profileRouter.put("/:id", authenticateToken, updateProfileName);

module.exports = {
    profileRouter
}