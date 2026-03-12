const http = require('http')

const app = require('./app')

const {loadPlanetsData} = require("./models/planets.model")
const { mongoConnection } = require('../services/mongo')

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer() {
    await mongoConnection
    await loadPlanetsData()

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

startServer()