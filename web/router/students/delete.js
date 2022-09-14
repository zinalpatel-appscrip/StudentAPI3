const studentModel = require('../../../models/students')
const Joi = require('joi')
const mongodb = require('mongodb')
const i18n = require('../../../locales')


const headers = Joi.object({
    'authorization': Joi.string().required().description('authentication token of user.'),
    'lan': Joi.string().required().description('specify language (en-english, de-german, etc.). \n \nDefault value : en')
}).unknown()

const payload = Joi.object({
    ids: Joi.array().description(i18n.studentApi.delete.fieldsDescription.ids)
})

const handler = async (req, h) => {
    const ids = req.payload.ids

    let objectids = ids.map(id => mongodb.ObjectId(id))
    const result = await studentModel.deleteStudent({ _id: { $in: objectids } })

    if (result.deletedCount)
        return h.response({ message: req.i18n.__('student')['delete']['200'] }).code(200)
    else if (result.deletedCount === 0)
        return h.response({ message: req.i18n.__('student')['delete']['404'] }).code(404)
    else
        return h.response({ message: req.i18n.__('student')['delete']['500'] }).code(500)
}

const deleteStudentsRes = {
    200: {
        description: i18n.studentApi.delete.responseDescription['200'],
        schema: Joi.object({
            message: Joi.string().example('Data deleted successfully').required()
        })
    },
    // 204: undefined, // pass-through "No Content" to swagger definition
    404: {
        description: i18n.studentApi.delete.responseDescription['404'],
        schema: Joi.object({
            message: Joi.string().example('No data found').required()
        })
    },
    500: {
        description: i18n.studentApi.delete.responseDescription['500'],
        schema: Joi.object({
            message: Joi.string().example('Internal server error').required()
        })
    },
    401: {
        description: i18n.studentApi.delete.responseDescription['401'],
        schema: Joi.object({
            statusCode: Joi.number().example(401),
            error: Joi.string().example('Unauthorized'),
            message: Joi.string().example('Invalid token'),
            attributes: Joi.object({ error: Joi.string().example('Invalid token') })
        })
    }

}


module.exports = { handler, headers, deleteStudentsRes, payload }