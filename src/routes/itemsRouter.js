const express = require("express");
const itemsRouter = express.Router();
const {authenticateToken} = require("../middleware/authToken");
const {getAllAccountItems, createSingleItem, getSingleItem, updateSingleItem, deleteSingleItem, getSoonExpiringItems, getExpiredItems} = require("../controllers/itemsController");

itemsRouter.use((req, res, next) => {
    console.log("A request has been made to /items");
    next();
});

itemsRouter.get("/", authenticateToken, getAllAccountItems);
itemsRouter.post("/", authenticateToken, createSingleItem);
itemsRouter.get("/:id", authenticateToken, getSingleItem);
itemsRouter.put("/:id", authenticateToken, updateSingleItem);
itemsRouter.delete("/:id", authenticateToken, deleteSingleItem);
itemsRouter.get("/expiring/:days", authenticateToken, getSoonExpiringItems);
itemsRouter.get("/list/expired", authenticateToken, getExpiredItems);

module.exports = {
    itemsRouter
}