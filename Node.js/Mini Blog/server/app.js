const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const multer = require('multer')

const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')

const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(multer({
    storage: storage,
    fileFilter: fileFilter
}).single('image'))

app.use('/feed', feedRoutes)
app.use('/auth', authRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/miniBlog')
    .then(result => {
        const server = app.listen(8080)
        const io = require('./socket').init(server)
        io.on("connection", () => {
            console.log('a client connected to the server')
        })
    })
    .catch(err => {
        console.log(err)
    })