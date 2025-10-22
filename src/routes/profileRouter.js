const express = require("express");
const profileRouter = express.Router();
const {authenticateToken} = require("../middleware/authToken");
const {getAllAccountProfiles, getSingleProfile, updateProfileName, deleteSingleProfile} = require("../controllers/profilesController");

profileRouter.use((req, res, next) => {
    console.log("A request has been made to /profiles");
    next();
});

profileRouter.get("/", authenticateToken, getAllAccountProfiles);
profileRouter.get("/:id", authenticateToken, getSingleProfile);
profileRouter.put("/:id", authenticateToken, updateProfileName);
profileRouter.delete("/:id", authenticateToken, deleteSingleProfile);

module.exports = {
    profileRouter
}