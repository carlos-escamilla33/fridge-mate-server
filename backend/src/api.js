const express = require("express");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;
const apiRouter = express.Router();
const authRouter = require("./routes/publicRoutes/auth");

// Verifying JWT Tokens goes here most likely
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        console.log(err);

        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}

apiRouter.use("/auth", authRouter);


module.exports = apiRouter;