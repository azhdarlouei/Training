const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/firstDB')
    .then(() => console.log('connected to mongoDB...'))
    .catch((err => console.log(err)))