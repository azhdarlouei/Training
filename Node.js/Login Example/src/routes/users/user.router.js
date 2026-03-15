const express = require("express")
const { httpAddUser, httpGetAllUsers, httpLogin } = require("./users.controller")

const usersRouter = express.Router()

usersRouter.post('/api/register', httpAddUser)
usersRouter.post('/api/login', httpLogin)
usersRouter.get('/api/users', httpGetAllUsers)

module.exports = usersRouter