const authModel = require('../../../models/auth')
const adminModel = require('../../../models/admin')

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const payload = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const headers = Joi.object({
    'lan': Joi.string().required().description('specify language (en-english, de-german, etc.). \n \nDefault value : en')
}).unknown()



const handler = async function name(req, h) {
    // i18n.setLocale(req.headers['lan'])
    //check if email exists in db
    const isEmailExists = await adminModel.find({ email: req.payload.email })
    if (isEmailExists.length) {
        //check if password is correct
        req.payload.password = md5(req.payload.password)
        const user = await adminModel.find({ email: req.payload.email, password: req.payload.password })
        if (user.length) {
            const token = await generateToken(user)
            return h.response({ message: 'Logged In!', token: token }).code(200)
        }
        else
            return h.response({ message: 'Invalid Credentials!' }).code(401)
    }
    else
        return h.response({ message: 'Invalid Credentials!' }).code(401)
}

async function generateToken(user) {

    const random_access_token = Math.random().toString(36).substr(2)
    try {
        const payload = {
            user: user[0]._id,
            date: Date(),
            access_token: random_access_token
        }

        //save payload
        authModel.replaceOne(
            { user: user[0]._id },
            {
                user: user[0]._id,
                date: Date(),
                access_token: random_access_token
            }
        )

        return jwt.sign({ payload }, process.env.SECRET_KEY, {
            expiresIn: 3 * 60 * 60
        })
    }
    catch (e) {
        console.log(e)
    }
}

const loginRes = {
    200: {
        description: 'This status code will be returned if User Succesfully Logs In',
        schema: Joi.object({
            message: Joi.string().example('Logged In!').required(),
            token: Joi.string().example('JWT Token').required()
        })
    },
    400: {
        description: 'Bad request while some data is missing or invalid.',
        schema: Joi.object({
            statusCode: Joi.number().example(400),
            error: Joi.string().example('Bad Request'),
            message: Joi.string().example('email must be a valid email')
        })
    },
    401: {
        description: 'If email or password is incorrect.',
        schema: Joi.object({
            message: Joi.string().example('Invalid Credentials!!!')
        })
    }
}

module.exports = { handler, payload, headers, loginRes }