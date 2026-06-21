const express = require('express')
const { body } = require('express-validator')

const User = require('../models/user')
const authController = require('../controllers/auth')

const router = express.Router()

router.post('/signup', [
    body('email').isEmail().custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: value })

        if (userDoc) {
            return Promise.reject('Email address already exist')
        }
    }),
    body('password').trim().isLength({ min: 4 }),
    body('name').trim().isLength({ min: 4 }).notEmpty(),
], authController.signup)

module.exports = router;