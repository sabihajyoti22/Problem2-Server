"use strict";
const express = require("express");
const { getAll, createTicket } = require("../Controller/ticket.controller");
const router = express.Router();
router.get("/", getAll);
router.post("/support/create_ ticket", createTicket);
module.exports = router;
