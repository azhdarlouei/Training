const parsCookies = require('../util/cookieparseer')

exports.getLogin = (req, res) => {
    const isLoggedIn = parsCookies(req)


    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: isLoggedIn['loggedIn']
    })
}

exports.postLogin = (req, res) => {
    req.session.isLoggedIn = true
    res.redirect('/')
}