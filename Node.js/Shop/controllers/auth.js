const parsCookies = require('../util/cookieparseer')
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
    User.findById('6a22bb525d19e72a6154a28d')
        .then(user => {
            req.session.isLoggedIn = true
            req.session.user = user
            req.session.save(err => {
                if (err) console.log(err)
                res.redirect('/')
            })
        })
}

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.log(err)
        res.redirect('/')
    })
}