const http = require('http')

const app = require('./app')

const { mongoConnection } = require('../services/mongo')

const PORT = 3000

const server = http.createServer(app)

const startServer = async () => {
    await mongoConnection()

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

startServer()