const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use('/', shopRoutes)


mongoose.connect('mongodb://localhost/Shop')
    .then(result => {
        app.listen(3000, () => {
            console.log('Listening on port 3000')
        })
    })
    .catch(err => {
        console.log(err)
    })