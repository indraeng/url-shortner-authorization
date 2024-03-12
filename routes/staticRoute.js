const express = require('express')
const Url = require('../models/url')
const { getUser } = require('../service/auth')
const { restrictTo } = require('../middlewares/auth')

const staticRoute = express.Router()

staticRoute.get('/admin/urls',restrictTo(['ADMIN']), async (req, resp) => {
    const docs = await Url.find({})
    return resp.render('Home', {
        docs: docs
    })
})

staticRoute.get('/home', restrictTo(['NORMAL','ADMIN']), async (req, resp) => {
    // const user = req.user
    // if(!user) return resp.redirect('/Login')
    const docs = await Url.find({ createdBy: req.user._id })
    return resp.render('Home', {
        docs: docs
    })
})
staticRoute.get('/signup', (req, resp) => {
    return resp.render('Signup')
})
staticRoute.get('/login', (req, resp) => {
    return resp.render('Login')
})

module.exports = staticRoute