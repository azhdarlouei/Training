const mongoose = require("mongoose")

const MONGO_URL = "mongodb://127.0.0.1:27017/loginExample"

let isConnect = false

mongoose.connection.once('open', () => {
    console.log("MongoDB connection is ready!")
    isConnect = true
})

mongoose.connection.on("error", (err) => {
    console.log(err)
    isConnect = false
})

const mongoConnection = async () => {
    console.log("Attempting to connect to MongoDB...")
    if (!isConnect) {
        try {
            await mongoose.connect(MONGO_URL)
        } catch (err) {
            console.log(err)
            isConnect = false
        }
    } else {
        console.log("you already connected")
    }
}

module.exports = { mongoConnection, isConnect }