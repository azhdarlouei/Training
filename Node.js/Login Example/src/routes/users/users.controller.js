const { addUser, getAllUsers, userNameExist, login } = require('./../../models/users/users.model')

const httpAddUser = async (req, res) => {
    const user = req.body

    if (!user.userName || !user.password) {
        return res.status(400).json({
            error: "enter userName and Password"
        })
    }
    if (await userNameExist(user.userName)) {
        return res.status(400).json({
            error: "this user name already exist"
        })
    }
    try {
        await addUser(user)

        return res.status(201).json(user)
    } catch (err) {
        console.log(err)
    }
}

const httpGetAllUsers = async (req, res) => {
    return await res.status(200).json(await getAllUsers())
}

const httpLogin = async (req, res)=>{
    const user = req.body

    if (!user.userName || !user.password) {
        return res.status(400).json({
            error: "enter userName and Password"
        })
    }
    if ((await login(user.userName, user.password)).length <= 0) {
        return res.status(400).json({
            error: "this user not exist"
        })
    }

    return res.status(201).json({
        status: "ok"
    })
}

module.exports = {
    httpAddUser,
    httpGetAllUsers,
    httpLogin
}