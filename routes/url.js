const express = require('express');
const {createShortUrl,redirectToOriginalUrl,getAnalytics} = require('../controllers/url')
const urlRouter = express.Router();


urlRouter.post('/', createShortUrl)
urlRouter.get('/:id',redirectToOriginalUrl)
urlRouter.get('/analytics/:id',getAnalytics)

module.exports = urlRouter