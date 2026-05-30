const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const User = require('./models/users')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findById('6a10a8a8cac5923e6685e77e')
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => {
            console.log(err)
        })
})

app.use('/admin', adminRoutes)
app.use('/', shopRoutes)


mongoose.connect('mongodb://localhost/Shop')
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