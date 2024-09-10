const Session = require('../models/SessionModel')
const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
require('dotenv').config
//login 
exports.login = async (req, res) => {
    const { email, password } = req.body
    console.log(`login : ${email} ${password}`)
    try {
        const user = await User.findOne({ email })
        if (user && await bcrypt.compare(password, user.password)) {
            const session = await Session.findOne({ userId: user._id })
            if (session) {
                return res.json({
                    "mesage": "Token still working",
                    "token": session.token
                })
            }
            const token = jwt.sign({ userId: user._id }, process.env.secret_key, { expiresIn: '1h' })
            const newsession = new Session({ userId: user._id, token })
            await newsession.save()
            res.json({ token })
        } else {
            return res.status(401).json("Ibvalid credetials")
        }
    } catch (e) {
        return res.status(500).json(e)
    }
}
//logout
exports.logout = async (req, res) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    try {
        if (token) {
            await Session.deleteOne({ token })

            res.status(200).json("Logged out successfully")
        } else {
            res.status(400).json('Token not provided')
        }
    } catch (e) {
        console.log(e)
        res.status(500).json(e)

    }
}