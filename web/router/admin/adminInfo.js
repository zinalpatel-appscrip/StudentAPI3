const Joi = require('joi')
const adminInfoModel = require('../../../models/admin')
const md5 = require('md5')

const UserJoiSchema = Joi.object({

    email: Joi.string()
        .email()
        // .external(validateUniqueEmail)
        .required(),

    password: Joi.string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/)
        .error(() => {
            throw new Error('Password must be between 6 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
        })
        .required(),

    name: Joi.string()
        .required(),

    phone: Joi.string()
        .optional(),
}).options({ abortEarly: false })


const headers = Joi.object({
    'lan': Joi.string().required().description('specify language (en-english, de-german, etc.). \n \nDefault value : en')
}).unknown()

const studentAdminRes = {
    201: {
        description: 'This status code will be returned if Details are successfully inserted!',
        schema: Joi.object({
            message: Joi.string().example('Data Inserted!!')
        })
    },
    400: {
        description: 'Bad request while some data is missing or invalid.',
        schema: Joi.object({
            statusCode: Joi.number().example(400),
            error: Joi.string().example('Bad Request'),
            message: Joi.string().example('email must be a valid email')
        })
    }
}

const handler = async (req, h) => {
    try {
        // i18n.setLocale(req.headers['lan'])
    
        req.payload.password = md5(req.payload.password)
        let result = await adminInfoModel.insert(req.payload)
        return h.response({ message: 'Data Inserted!' }).code(201)
   
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = { handler, studentAdminRes, UserJoiSchema, headers }