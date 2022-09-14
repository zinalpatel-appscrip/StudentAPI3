const Joi = require('joi')
const adminInfoModel = require('../../../models/admin')
const md5 = require('md5')
const i18n = require('../../../locales')

const validateUniqueEmail = async (email) => {

    const isEmailExsists = await adminInfoModel.find({ email: email })
    if (isEmailExsists.length)
        throw new Error('This email is aleady in use. Please Enter another email.')

}


const UserJoiSchema = Joi.object({

    email: Joi.string()
        .email()
        .external(validateUniqueEmail)
        .example('abc@example.com')
        .description(i18n.adminApi.fieldsDescription.email)
        .required(),

    password: Joi.string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/)
        .error(() => {
            throw new Error('Password must be between 6 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
        })
        .example('Aa1@bc')
        .description(i18n.adminApi.fieldsDescription.password)
        .required(),

    name: Joi.string()
        .example('abc')
        .description(i18n.adminApi.fieldsDescription.name)
        .required(),

    phone: Joi.string()
        .example('1234567890')
        .description(i18n.adminApi.fieldsDescription.phone)
        .optional(),
}).options({ abortEarly: false })


const headers = Joi.object({
    'lan': Joi.string().required().description('specify language (en-english, de-german, etc.). \n \nDefault value : en')
}).unknown()

const studentAdminRes = {
    201: {
        description: i18n.adminApi.responseDescription['201'],
        schema: Joi.object({
            message: Joi.string().example('Data Inserted!!')
        })
    },
    400: {
        description: i18n.adminApi.responseDescription['400'],
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
        return h.response({ message: req.i18n.__('admin') }).code(201)
   
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = { handler, studentAdminRes, UserJoiSchema, headers }