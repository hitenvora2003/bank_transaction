const user = require('../model/user')
const jwt = require('jsonwebtoken')

exports.authcheck = async (req, res, next) => {
    try {

        const token = req.headers.authorization
        console.log(token);
        if (!token) throw new Error('attach token')

        const tokenVerify = jwt.verify(token, 'ten')
        console.log(tokenVerify);
        if (!tokenVerify) throw new Error('invalid token')
        const userVerify = await user.findById(tokenVerify.id)
        if (!userVerify) throw new Error('invalid user')

        next()


    } catch(error) {
        res.status(500).json({
            status: 'fail',
            message: error.message

        })
    }
}