const express = require("express")
const path = require('path')
const morgan = require('morgan')
const helmet = require('helmet')

const clientRouter = require("./routes/client/client.router")
const usersRouter = require("./routes/users/user.router")

const app = express()

app.use(morgan('combined'))

app.use(helmet())

app.use(express.json())

app.use(express.static(path.join(__dirname, "..", "public")))

app.use(usersRouter)

app.use('/', clientRouter)

module.exports = app