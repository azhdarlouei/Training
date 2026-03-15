const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    userId: {
        type: Number,
        require: true,
        trim: true
    },
    userName: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    }
})

module.exports = mongoose.model("users", usersSchema)