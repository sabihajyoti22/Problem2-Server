const mongoose = require("mongoose")

const ticketModel = mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    deviceID: {
        type: String,
        require: true
    },
    queryText: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Ticket", ticketModel)