exports.getPost = (req, res, next) => {
    res.status(200).json({
        posts: [{
            _id: '1',
            title: 'First Post',
            content: 'this is the first post',
            imageUrl: 'images/pic.jpg',
            creator: {
                name: 'Alireza'
            },
            createdAt: new Date()
        }]
    })
}

exports.createPost = (req, res, next) => {
    const title = req.body.title
    const content = req.body.content

    res.status(201).json({
        message: "post created!",
        post: {
            id: new Date().toString(),
            title: title,
            content: content,
            creator: {
                name: "alireza"
            },
            createdAt: new Date()
        }
    })
}