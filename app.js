require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const apiRouter = require("./src/api");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;