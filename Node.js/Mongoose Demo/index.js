const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/firstDB')
    .then(() => console.log('connected to mongoDB...'))
    .catch((err => console.log(err)))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

const createCourse = async () => {
    const course = new Course({
        name: "Angular",
        author: "Alireza",
        tags: ['angular', 'ng'],
        isPublished: true
    })

    const result = await course.save()

    console.log(result)
}

createCourse()