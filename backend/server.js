require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const server = express();

const apiRouter = require("./src/api");
const morgan = require("morgan");

server.use(express.json());
server.use(morgan("dev"));
server.use(express.urlencoded({extended:true}));
server.use(cors());
server.use("/api", apiRouter);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});