exports.getPost = (req, res, next) => {
    res.status(200).json({
        posts: [{ title: 'First Post', content: 'this is the first post' }]
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
            content: content
        }
    })
}