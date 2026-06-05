const parsCookies = require('../util/cookieparseer')
const bcrypt = require('bcryptjs')
const User = require('../models/users')

exports.getLogin = (req, res) => {
    const isLoggedIn = parsCookies(req)


    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: isLoggedIn['loggedIn']
    })
}

exports.postLogin = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email: email })
        .then(user => {
            if (!user) return res.redirect('/')

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
        pageTitle: 'SignUp',
        isAuthenticated: false
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
            return res.redirect('/login')
        })
        .catch(err => {
            console.log(err)
        })
}