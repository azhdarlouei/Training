const { validationResult } = require('express-validator')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')

const Post = require('../models/post')
const User = require('../models/user')

exports.getPost = (req, res, next) => {
    const posts = Post.find({})
        .then(posts => {
            return res.status(200).json({
                message: 'Post fetched',
                posts: posts
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: "Fetching posts failed."
            })
        })
}

exports.createPost = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(422).json({
                message: "Validation faild, your entered data is invalid",
                errors: errors.array(),
            });
        }

        if (!req.file) {
            return res.status(422).json({
                message: "Please upload a file"
            })
        }

        const title = req.body.title;
        const content = req.body.content;

        const post = new Post({
            title: title,
            content: content,
            imageUrl: req.file.path,
            creator: req.userId,
        });

        const postResult = await post.save();
        const user = await User.findById(req.userId);

        user.posts.push(postResult);

        const creator = await user.save();

        res.status(201).json({
            message: "Post Created Successfully",
            post: postResult,
            creator: creator
        });
    } catch (err) {
        console.error("Create Post Error:", err)
        if (!err.statusCode) {
            return res.status(500).json({
                message: "Create post failed."
            })
        }
        next(err)
    }
}

exports.getSinglePost = async (req, res, next) => {
    const postId = req.params.postId;

    try {
        const post = await Post.findById(postId).populate('creator');
        if (!post) {
            return res.status(404).json({
                message: 'Post not found!'
            });
        }

        res.status(200).json({
            message: 'Post fetched successfully',
            post: post
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updatePost = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            maessage: "Validate failed, your entered data is invalid",
            errors: errors.array()
        })
    }

    const postId = req.params.postId

    const title = req.body.title
    const content = req.body.content
    let imageUrl = req.body.image

    if (req.file) {
        imageUrl = req.file.path
    }

    if (!imageUrl) {
        return res.status(422).json({
            maessage: "Please upload a file",
            errors: errors.array()
        })
    }

    const post = await Post.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: 'post not found',
        })
    }

    if (imageUrl !== post.imageUrl && imageUrl !== 'undefined') {
        clearImage(post.imageUrl)
    }

    post.title = title
    post.content = content
    post.imageUrl = imageUrl

    await post.save()

    return res.status(200).json({
        message: "Post updated!",
        post: post
    })
}

const clearImage = async (image) => {
    console.log(image)
    const imagePath = path.join(__dirname, '..', image)

    if (await fs.existsSync(imagePath)) {
        await fs.unlinkSync(imagePath, (err) => {
            throw err
        })
        console.log('image deleted successfully')
    } else {
        console.log('image not found')
    }

}

exports.deletePost = async (req, res, next) => {
    const postId = req.params.postId;

    try {
        await Post.findByIdAndDelete(postId)

        const user = await User.findById(req.userId)
        if (user) {
            user.posts.pull(postId)
            await user.save()
        }

        res.status(200).json({ message: "Post deleted successfully!" })
    } catch (err) {
        console.error(err)
        if (!err.statusCode) err.statusCode = 500
        next(err)
    }
};