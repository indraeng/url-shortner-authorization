// const sessionIdToUserMap = new Map()
const jwt = require('jsonwebtoken')

const secretKey = 'indrajit@123#456'

const setUser = (user) => {
    // sessionIdToUserMap.set(id, user)
    return jwt.sign({
        _id: user._id,
        name: user.name,
        role:user.role
    }
        , secretKey)
}

const getUser = (token) => {
    // return sessionIdToUserMap.get(id)
    if(!token) return null
    return jwt.verify(token, secretKey)
}

module.exports = { setUser, getUser }