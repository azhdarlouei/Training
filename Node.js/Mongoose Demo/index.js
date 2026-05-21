const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/firstDB')
    .then(() => console.log('connected to mongoDB...'))
    .catch((err => console.log(err)))

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'design', 'desktop']
    },
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: () => {
            return this.isPublished
        }
    }
}
)

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

// getCourse()


const updateCourse = async (id) => {
    // const course = await Course.findById(id)

    // if (!course) return

    // course.author = "Alireza Azhdarlouei"
    // course.isPublished = false

    // // course.set({
    // //     author: "Alireza Azhdarlouei",
    // //     isPublished: false
    // // })

    // const result = await course.save()
    // console.log(result)

    const course = await Course.findByIdAndUpdate({ _id: id }, {
        $set: {
            author: "ali",
            isPublished: false
        }
    }, { new: true })

    console.log(course)
}

// updateCourse('6a0a10b72c36bb206aa23fa2')


const removeCourse = async (id) => {
    // const result = await Course.deleteOne({_id: id})
    const result = await Course.deleteMany({ isPublished: true })

    console.log(result)
}

// removeCourse('6a0a10b72c36bb206aa23fa2')