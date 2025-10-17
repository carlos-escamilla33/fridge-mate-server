const express = require("express");
const accountsRouter = express.Router();
const {authenticateToken} = require("../middleware/authToken")
const {registerProfile, getAllAccountProfileInfo, updateAccountInfo} = require("../controllers/accountsController");

accountsRouter.use((req, res, next) => {
    console.log("A request has been made to /accounts");
    next();
});

accountsRouter.post("/register-profile", authenticateToken, registerProfile);
accountsRouter.get("/me", authenticateToken, getAllAccountProfileInfo);
accountsRouter.put("/me", authenticateToken, updateAccountInfo);

module.exports = {
    accountsRouter
}


