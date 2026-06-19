const express = require('express')
const { check, validationResult } = require('express-validator')

const router = express.Router()

const authController = require('../controllers/auth')

router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.post('/logout', authController.postLogout)
router.get('/signup', authController.getSignup)
router.post('/signup', check('email').isEmail(), authController.postSignup)
router.get('/reset', authController.getReset)
router.post('/reset', authController.postReset)
router.get('/reset/:token', authController.getResetPassword)
router.post('/new-password', authController.postNewPassword)

module.exports = router