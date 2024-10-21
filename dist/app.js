"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const user = require('./Routes/user.route');
// Connect DB
require("./Config/db");
// CORS
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// api/auth/signup : POST
// api/auth/signin : POST
app.use('/api/auth', user);
app.use("/", (req, res) => {
    res.statusCode = 200;
    res.send("<h1>Welcome to Home</h1>");
});
// Route not found error
app.use((req, res) => {
    res.statusCode = 404;
    res.send("<h1>404 Page not found!!!</h1>");
});
// Server error
app.use((req, res) => {
    res.statusCode = 500;
    res.send("<h1>Server Error</h1>");
});
module.exports = app;
