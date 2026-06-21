const express = require('express')
const { body } = require('express-validator')

const isAuth = require('../middleware/verify-token')

const feedController = require('../controllers/feed')

const router = express.Router()

router.get('/post', isAuth, feedController.getPost)
router.post('/post', isAuth, [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('content')
        .trim()
        .isLength({ min: 5 })
], feedController.createPost)
router.get('/singlePost/:postId', isAuth, feedController.getSinglePost)
router.put('/post/:postId', isAuth, feedController.updatePost)
router.delete('/post/:postId', isAuth, feedController.deletePost)

module.exports = router