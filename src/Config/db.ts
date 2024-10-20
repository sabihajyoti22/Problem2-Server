const config = require("./config")
const mongoose = require("mongoose")

const dbURL = config.db.url

mongoose.connect(dbURL)
    .then(() => {
        console.log("MongooDB Atlas is connected")
    })
    .catch((err: any) => {
        console.log(err)
        process.exit(1)
    })