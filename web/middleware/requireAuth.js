// require('dotenv').config()
const mongodb = require('mongodb')
const authModel = require('../../models/auth')
const config = require('../../config')

// console.log(config.auth.SECRET_KEY)
const requireAuth = async (decodedToken, req, res) => {

    try {
        if (decodedToken) {
            const data = await authModel.aggregate([
                {
                    $match: {
                        user: mongodb.ObjectId(decodedToken.payload.user),
                        access_token: decodedToken.payload.access_token
                    }
                }
            ]).toArray()

            if (data.length) {
                return { isValid: true }
            }
            else {
                return { isValid: false }
            }
        }
        else
            return { isValid: false }

    } catch (e) {
        console.log(e)
        return { isValid: false }
    }

}

module.exports = { requireAuth }