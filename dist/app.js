"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ticket = require("./Routes/ticket.route");
const app = express();
// Connect DB
require("./Config/db");
// CORS
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("<h1>Home Route</h1>");
});
app.use("/api", ticket);
module.exports = app;
