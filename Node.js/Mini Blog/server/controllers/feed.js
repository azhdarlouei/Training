const { validationResult } = require('express-validator')

const Post = require('../models/post')

exports.getPost = (req, res, next) => {
    const posts = Post.find({})
        .then(posts => {
            return res.status(200).json({
                posts: posts
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: "Fetching posts failed."
            })
        })
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            maessage: "Validate failed, your entered data is invalid",
            errors: errors.array()
        })
    }

    const title = req.body.title
    const content = req.body.content

    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/pic.jpg',
        creator: {
            name: 'Alireza'
        },
    })

    post.save()
        .then(result => {
            return res.status(201).json({
                message: "post created!",
                post: result
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Creating a post failed!',
                error: err
            })
        })


}