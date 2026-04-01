const express = require("express")
const path = require('path')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieSession = require("cookie-session")

const clientRouter = require("./routes/client/client.router")
const usersRouter = require("./routes/users/user.router")

const app = express()

app.use(morgan('combined'))

app.use(helmet())

app.use(cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["secretkey", "secretkeyforrotation"]
}))

const checkLoggedIn = (req, res, next) => {
    let isLoggedIn = false
    if (req.session.user) {
        isLoggedIn = true
    }
    if (!isLoggedIn) {
        return res.status(401).json({
            error: 'You must log in!'
        })
    }

    next()
}

app.get('/secret', checkLoggedIn, (req, res) => {
    const userName = (req.session.user).userName
    res.end("hi " + userName)
})

app.use(express.json())

app.use(express.static(path.join(__dirname, "..", "public")))

app.use(usersRouter)

app.use('/', clientRouter)

module.exports = app