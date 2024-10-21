"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./config");
const mongoose = require("mongoose");
const dbURL = config.db.url;
mongoose.connect(dbURL)
    .then(() => {
    console.log("MongooDB Atlas is connected");
})
    .catch((err) => {
    console.log(err);
    process.exit(1);
});
