const mongoose = require('mongoose')

const MONGO_URL = "mongodb://localhost:27017/nasa"

mongoose.connection.once('open', () => {
    console.log("MongoDB connection is ready!")
})

mongoose.connection.on("error", (err) => {
    console.log(err)
})

const mongoConnection = async () => {
    mongoose.connect(MONGO_URL)
}

module.exports = {mongoConnection}