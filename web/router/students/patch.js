const validatePayload = require('../../commnModels/student/studentModel')
const studentModel = require('../../../models/students')
const StudentJoiSchema = validatePayload.StudentJoiSchema
const mongodb = require('mongodb')
const Joi = require('joi')
const i18n = require('../../../locales')

const headers = Joi.object({
    'authorization': Joi.string().required().description('authentication token of user.'),
    'lan': Joi.string().required().description('specify language (en-english, de-german, etc.). \n \nDefault value : en')
}).unknown()

const params = Joi.object({
    id: Joi.string().example('63196f832ee2e759e0f0f9a0').description(i18n.studentApi.update.paramsDescription.id)
})

const handler = async (req, h) => {
    try {
        let res = 'Error'

        //check if resourse exsists
        let data = await studentModel.find({ _id: mongodb.ObjectId(req.params.id) })
        if (data.length) {
            let result = await studentModel.update({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.payload })
            console.log(req.payload)
            return h.response({ message: req.i18n.__('student')['update']['200'] }).code(200)
        }
        else {
            console.log('not found')
            res = 'requested student not found'
            return h.response({ message: req.i18n.__('student')['update']['404'] }).code(404)
        }

    }
    catch (e) {
        console.log('in patch catch')
        console.log(e)
    }
}

const StudentUpadteRes = {
    200: {
        description: i18n.studentApi.update.responseDescription['200'],
        schema: Joi.object({
            message: Joi.string().example('Data Updated!!')
        })
    },
    404: {
        description: i18n.studentApi.update.responseDescription['404'],
        schema: Joi.object({
            message: Joi.string().example('requested student not found')
        })
    },
    401: {
        description: i18n.studentApi.update.responseDescription['401'],
        schema: Joi.object({
            statusCode: Joi.number().example(401),
            error: Joi.string().example('Unauthorized'),
            message: Joi.string().example('Invalid token'),
            attributes: Joi.object({ error: Joi.string().example('Invalid token') })
        })
    }

}

module.exports = { handler, StudentJoiSchema, headers, StudentUpadteRes, params }