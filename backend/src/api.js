const express = require("express");
const jwt = require("jsonwebtoken");
const apiRouter = express.Router();
const authRouter = require("./routes/authRoutes");

apiRouter.use("/auth", authRouter);


module.exports = apiRouter;