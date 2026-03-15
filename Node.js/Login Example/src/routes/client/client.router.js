const express = require("express")
const path = require("path")

const clientRouter = express.Router()

const publicPath = path.join(__dirname, "..", "..", "..", "public")

clientRouter.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, "pages", "login.html"))
})

clientRouter.get('/register', (req, res) => {
    res.sendFile(path.join(publicPath, "pages", "register.html"))
})

clientRouter.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"))
})

module.exports = clientRouter