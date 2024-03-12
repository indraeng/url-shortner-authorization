const { getUser } = require('../service/auth')

function checkForAuthentication(req, resp, next) {
    const tokenCookie = req.cookies?.token
    req.user = null
    if (!tokenCookie) return next()
    const user = getUser(tokenCookie)
    req.user = user
    next()
}
function restrictTo(roles = []) {
    return function (req, resp, next) {
        if (!req.user) return resp.redirect('/Login')
        if (!roles.includes(req.user.role)) return resp.end('UnAuthorized')
        return next()
    }
}


module.exports = { checkForAuthentication, restrictTo }