const express = require("express");
const cors = require("cors");
const app = express();

// Parses JSON data from request bodies
// Without it, req.body is undefined when clients send JSON
app.use(express.json());
// Parses form data from HTML forms
// Extended: true allows nested objects in form data
app.use(express.urlencoded({extended:true}));
// Enables cross-origin requests(frontend can call backend)
app.use(cors());

app.get("/", (req, res) => {
    res.json({message: "API is running!"});
});

module.exports = app;