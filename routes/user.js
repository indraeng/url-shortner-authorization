const express = require('express')
const { handleLogin, handleSignup } = require('../controllers/user')

const userRouter = express.Router()

userRouter.post('/signup', handleSignup)

userRouter.post('/login', handleLogin)


module.exports = userRouter