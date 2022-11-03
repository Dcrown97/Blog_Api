module.exports = (req, res, next) => {
    try {
        const getAuthorized = req.get('authorization')

        if (!(getAuthorized && getAuthorized.toLowerCase().startsWith('bearer'))) {
            throw new Error()
        }

        // if signing in with bearer token
        req.token = getAuthorized.substring(7)
        next()
    } catch (err) {
        err.source = 'jwt middleware error'
        next(err)
    }
}