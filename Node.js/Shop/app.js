const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const User = require('./models/users')

const MongoDB_URI = 'mongodb://localhost/Shop'

const app = express()
const store = new MongoDBStore({
    uri: MongoDB_URI,
    collection: 'session'
})

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use((req, res, next) => {
    User.findById('6a22bb525d19e72a6154a28d')
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => {
            console.log(err)
        })
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)


mongoose.connect(MongoDB_URI)
    .then(result => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: "Alireza",
                        email: "alireza@gmail.com",
                        cart: {
                            items: []
                        }
                    })
                    user.save()
                }
            })

        app.listen(3000, () => {
            console.log('Listening on port 3000')
        })
    })
    .catch(err => {
        console.log(err)
    })