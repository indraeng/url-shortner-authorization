const Url = require('../models/url')
const shortid = require('shortid');
const { getUser } = require('../service/auth')

const createShortUrl = async (req, resp) => {
    const body = req.body;
    if (!body) return resp.json({ msg: 'Please provide the original url' })
    const shortId = shortid.generate();
    // const sessionid = req.cookies.sessionid;
    // const loggedinUser = getUser(sessionid)
    const result = await Url.create({
        originalUrl: body.url,
        shortId: shortId,
        visitHistory: [],
        createdBy:req.user._id
    })
    return resp.render('Home', { id: shortId })
}

const redirectToOriginalUrl = async (req, resp) => {
    const short_id = req.params.id;
    const result = await Url.findOneAndUpdate({ shortId: short_id }, {
        $push: {
            visitHistory: { timeStamps: Date.now() }
        }
    })
    // console.log('result', result)
    // return resp.json({ msg: 'hello' })
    return resp.redirect(result.originalUrl)
}

const getAnalytics = async (req, resp) => {
    const short_id = req.params.id;
    const result = await Url.findOne({ shortId: short_id })
    console.log('result', result)
    return resp.json({ clicks: result.visitHistory.length, analytics: result.visitHistory })
}

module.exports = { createShortUrl, redirectToOriginalUrl, getAnalytics }