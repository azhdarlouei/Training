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
        name: "Node JS",
        author: "Alireza",
        tags: ['node.js', 'npm'],
        price: 900,
        isPublished: true
    })

    const result = await course.save()

    console.log(result)
}

// createCourse()


const getCourse = async () => {

    // eq  (equal)
    // ne  (not euqal)
    // gt  (greater than)
    // gte (greater than or equal)
    // 1t  (less than)
    // lte (less than or equal)
    // in
    // nin (not in)

    const courses = await Course
        // .find({
        //     author: "Alireza",
        //     isPublished: true
        // })
        // .find({
        //     $eq: 900
        // })
        // .limit(10)
        // .sort({
        //     name: 1
        // })
        // .select({
        //     name: 1,
        //     tags: 1,
        //     price: 1
        // })

        // Start With
        // .find({
        //     author: /^ALi/i, // i = case-insensitivity
        // })

        // End With
        // .find({
        //     author: /Reza$/i
        // })

        // Contains
        // .find({
        //     author: /.*ire.*/i
        // })

    console.log(courses)
}

getCourse()