import express, { response } from 'express'
import bcrypt from 'bcrypt'

const app = express()

app.use(express.json())

const users = []

app.post('/register', async (req, res) => {
    const userName = req.body.userName
    const password = req.body.password

    if (!userName || !password) {
        return res.status(400).send("Username and password are required!")
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        users.push({ userName: userName, password: hashedPassword })
        return res.status(201).send(`Registered user ${userName}`)
    } catch (error) {
        res.status(500).send(`Eror registering ${userName}`)
    }
})

const findUserByUsername = (userName) =>{
    let user
    users.forEach((_user)=>{
        if(_user.userName == userName){
            user = _user
        }
    })
    return user
}

app.post('/login', async (req, res) => {
    const userName = req.body.userName
    const password = req.body.password

    if (!userName || !password) {
        return res.status(400).send("Username and password are required!")
    }

    const user = findUserByUsername(userName)

    if(!user){
        return res.status(401).send(`Couldn't find user`)
    }

    try {
        const passwordMatch = await bcrypt.compare(password, user.password)

        if(passwordMatch){
            res.status(200).send('Logged in')
        }else{
            res.status(401).send('Password incorrect')
        }
    } catch (error) {
        res.status(500).send('Error logging in')
    }
})

app.listen(3000)