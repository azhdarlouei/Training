const express = require('express')
const { check, body } = require('express-validator')

const router = express.Router()

const authController = require('../controllers/auth')

router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.post('/logout', authController.postLogout)
router.get('/signup', authController.getSignup)
router.post('/signup',
    [
        check('email')
            .isEmail()
            .withMessage("لطفا ایمیل را به درستی وارد کنید")
            .custom((value, { req }) => {
                if (value == 'test@gmail.com') {
                    throw new Error('شما حق ورود به وبسایت مارا ندارید.')
                }

                return true
            }),
        body('password')
            .isLength({ min: 5 })
            .isAlphanumeric()
            .withMessage('رمز شما ضعیف است')
    ]
    , authController.postSignup)
router.get('/reset', authController.getReset)
router.post('/reset', authController.postReset)
router.get('/reset/:token', authController.getResetPassword)
router.post('/new-password', authController.postNewPassword)

module.exports = router