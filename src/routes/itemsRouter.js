const express = require("express");
const itemsRouter = express.Router();
const {authenticateToken} = require("../middleware/authToken");
const {getAllAccountItems, createSingleItem} = require("../controllers/itemsController");

itemsRouter.use((req, res, next) => {
    console.log("A request has been made to /items");
    next();
});

itemsRouter.get("/", authenticateToken, getAllAccountItems);
itemsRouter.post("/", authenticateToken, createSingleItem);

module.exports = {
    itemsRouter
}