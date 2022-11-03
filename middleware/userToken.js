const User = require('../model/userModel')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const userToken = jwt.verify(req.token, process.env.SECRET)
        const user = await User.findById(userToken.id)
        if (!user) {
            throw new Error()
        }

        // add user to request object
        req.user = user
        next()
    } catch (err) {
        err.source = 'jwt middleware error'
        next(err)
    }
}