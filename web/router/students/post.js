const validatePayload = require('../../commnModels/student/studentModel')
const StudentJoiSchema = validatePayload.StudentJoiSchema
const studentModel = require('../../../models/students')
const Joi = require('joi')


const headers = Joi.object({
    'authorization': Joi.string().required().description('authentication token of user.'),
    'lan': Joi.string().required().description('specify language (en-english, de-german, etc.). \n \nDefault value : en')
}).unknown()

const handler = async (req, h) => {
    try {
        // i18n.setLocale(req.headers['lan'])
        //validate student info
        // let res = 'Error'

        const result = await studentModel.insert([req.payload])
        // res = result.acknowledged ? "Student Created!!" : 'An error occured'
        return h.response({ message: 'Student Created!' }).code(201)
        

    } catch (e) {
        console.log(e)
    }
}

const StudentInsertRes = {
    201: {
        description: 'This status code will be returned if Details are successfully inserted!',
        schema: Joi.object({
            message: Joi.string().example('Student Created!!')
        })
    },
    400: {
        description: 'Bad request while some data is missing or invalid.',
        schema: Joi.object({
            statusCode: Joi.number().example(400),
            error: Joi.string().example('Bad Request'),
            message: Joi.string().example('admission_date must be less than now')
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

module.exports = { handler, StudentJoiSchema, headers, StudentInsertRes }