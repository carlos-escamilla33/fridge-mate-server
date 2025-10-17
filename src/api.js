const express = require("express");
// const jwt = require("jsonwebtoken");
const apiRouter = express.Router();
const {authRouter} = require("./routes/authRoutes");
const {accountsRouter} = require("./routes/accountRoutes");
const {profileRouter} = require("./routes/profileRouter");

apiRouter.use("/auth", authRouter);
apiRouter.use("/accounts", accountsRouter);
apiRouter.use("/profiles", profileRouter);


module.exports = apiRouter;