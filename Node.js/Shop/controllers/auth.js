const parsCookies = require('../util/cookieparseer')
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const sendEmail = require('../util/email')
const crypto = require('crypto')

exports.getLogin = (req, res) => {
    const isLoggedIn = parsCookies(req)


    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: req.flash('error')
    })
}

exports.postLogin = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'ایمیل یا پسورد شما اشتباه است!')
                return res.redirect('/login')
            }

            return bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        req.session.isLoggedIn = true
                        req.session.user = user
                        return req.session.save(err => {
                            if (err) console.log(err)
                            res.redirect('/')
                        })
                    }
                })

            res.redirect('/login')
        })
}

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.log(err)
        res.redirect('/')
    })
}

exports.getSignup = (req, res) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'SignUp'
    })
}

exports.postSignup = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) return res.redirect('/')

            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        cart: { item: [] }
                    })

                    return user.save()
                })
        })
        .then(() => {
            sendEmail({ subject: 'hello', text: 'welcome!', userEmail: email })
            return res.redirect('/login')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getReset = (req, res) => {
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password'
    })
}

exports.postReset = (req, res) => {
    crypto.randomBytes(32, (err, buff) => {
        if (err) {
            console.log(err)
            return res.redirect('/reset')
        }

        const token = buff.toString('hex')

        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) return res.redirect('/reset')

                user.resetToken = token
                user.expiredDateResetToken = Date.now() + (3600000)

                return user.save()
            })
            .then(result => {
                sendEmail({
                    userEmail: req.body.email,
                    subject: 'بازیابی رمز عبور',
                    text: `
                        <p>درخواست بازیابی رمز عبور</p>
                        <p>
                            برای بازیابی رمز عبور <a href="http://localhost:3000/reset/${token}">کلیک کنید</a>
                        </p>
                    `
                })
            })
    })
}