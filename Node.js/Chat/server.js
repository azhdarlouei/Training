const express = require('express')
const http = require('http')
const path = require('path')
const socket = require('socket.io')

const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socket(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
    console.log('someone connected!');
});

server.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})