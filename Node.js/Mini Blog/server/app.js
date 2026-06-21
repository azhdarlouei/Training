const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

const feedRoutes = require('./routes/feed')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/feed', feedRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/miniBlog')
    .then(result => {
        app.listen(8080)
    })
    .catch(err => {
        console.log(err)
    })