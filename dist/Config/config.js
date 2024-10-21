"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const path = require('path')
// require("dotenv").config({ path: path.resolve(__dirname, '../../.env') })
require("dotenv").config();
const dev = {
    app: {
        port: process.env.PORT || 5000
    },
    db: {
        url: process.env.DATABASE || "mongodb://localhost:27017/"
    }
};
module.exports = dev;
