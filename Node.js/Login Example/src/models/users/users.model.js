const { isConnect } = require('../../../services/mongo')
const users = require('./user.mongo')

const DEFAULT_USER_ID = 0

const addUser = async (user) => {
    console.log(isConnect)
    try {
        const newUserData = { ...user, userId: await getLastUserId() }
        await users.create(newUserData)
    } catch (error) {
        console.log(error)
    }
}

const login = async (userName, password) => {
    try {
        return await users.find({ userName: userName, password: password })
    } catch (error) {
        console.log(error)
    }
}

const getAllUsers = async () => {
    try {
        return await (users.find({}, { _id: 0, userName: 1, userId: 1 }))
    } catch (error) {
        console.log(error)
    }
}

const getLastUserId = async () => {
    try {
        const lastUserId = await users.findOne({}, { userId: 1, _id: 0 }).sort('-userId')

        if (!lastUserId) {
            return DEFAULT_USER_ID
        } else {
            return lastUserId.userId + 1
        }
    } catch (error) {
        console.log(error)
    }
}

const userNameExist = async (user) => {
    try {
        const userName = await users.find({ userName: user }, { userId: 1, _id: 0 })
        if (userName.length > 0) {
            return userName
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addUser,
    login,
    getAllUsers,
    userNameExist
}