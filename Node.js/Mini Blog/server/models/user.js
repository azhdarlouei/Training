const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, mdefault: "new user" },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
})

module.exports = mongoose.model('User', userSchema)