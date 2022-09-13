const jwt = require('jsonwebtoken')
const Boom = require('@hapi/boom')
const mongodb = require('mongodb')
const authModel = require('../../../models/auth')
const Joi = require('joi')

const handler = async (req, res) => {

    try {
        const token = req.headers.authorization
        if (token) {
            const decodedToken = await jwt.verify(token, process.env.SECRET_KEY)
            if (decodedToken) {
                const result = await authModel.deleteOne(
                    {
                        user: mongodb.ObjectId(decodedToken.payload.user),
                        access_token: decodedToken.payload.access_token
                    }
                )

                if (result.deletedCount === 1) {
                    return res.response({ message: 'Logged Out!!' }).code(200)
                }
                else {
                    return Boom.unauthorized('Unauthorized')
                }
            }
            else
                return Boom.unauthorized('Unauthorized')
        }
        else {
            return Boom.unauthorized('Unauthorized')
        }
    } catch (e) {
        console.log(e)
    }

}

const logoutRes = {
    responses: {
        200: {
            description: 'This status code will be returned if User Succesfully Logs Out',
                schema: Joi.object({
                    message: Joi.string().example('Logged Out!!!').required(),
                })
        },
        401: {
            description: 'If provided token is invalid or not provided.',
                schema: Joi.object({
                    statusCode: Joi.number().example(401),
                    error: Joi.string().example('Unauthorized'),
                    message: Joi.string().example('Invalid token'),
                    attributes: Joi.object({ error: Joi.string().example('Invalid token') })
                })
        },
    }

}

const headers = Joi.object({
    'authorization': Joi.string().required().description('authentication token of user.'),
    'lan': Joi.string().required().description('specify language (en-english, de-german, etc.). \n \nDefault value : en')
}).unknown()

module.exports = { handler, logoutRes, headers }