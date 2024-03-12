const User = require('../models/user')
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../service/auth')


const handleSignup = async (req, resp) => {
    const { name, email, password } = req.body;
    const result = await User.create({
        name,
        email,
        password
    })
    return resp.render('Home')
}

const handleLogin = async (req, resp) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password })
    if (!user) return resp.render('Login', {
        error: 'Invalid username and password'
    })
    const token = setUser(user)
    resp.cookie('token', token)
    return resp.redirect('/Home')
    // return resp.json({ token })
}

module.exports = { handleLogin, handleSignup }