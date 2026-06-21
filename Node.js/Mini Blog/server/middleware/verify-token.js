const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')

    if (!authHeader) {
        return res.status(401).json({
            message: "Invalid authorization header"
        })
    }

    const token = authHeader

    const decodedToken = jwt.verify(token, "Alireza")

    if (!decodedToken) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    req.userId = decodedToken.userId
    next()
}