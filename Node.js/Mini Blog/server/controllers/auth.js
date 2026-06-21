const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.signup = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            maessage: "Validate failed, your entered data is invalid",
            errors: errors.array()
        })
    }

    const email = req.body.email
    const name = req.body.name
    const password = req.body.password

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        email: email,
        password: hashedPassword,
        name: name
    })

    const result = user.save()

    res.status(201).json({
        message: "User saved successfully",
        userId: result._id
    })
}

exports.login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(401).json({
            maessage: "user not found"
        })
    }

    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
        return res.status(401).json({
            maessage: "password is wrong"
        })
    }

    const token = jwt.sign({ email: user.email, userId: user._id.toString() }, "Alireza", {
        expiresIn: '1h'
    })

    res.status(200).json({
        token: token,
        userId: user._id.toString()
    })
} 