const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    activate: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Users", userModel)