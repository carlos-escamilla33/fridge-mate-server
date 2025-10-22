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

server.use((err, req, res, next) => {
  console.error('Error:', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// server -> api -> route -> route action -> route controller