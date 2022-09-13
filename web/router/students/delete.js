const studentModel = require('../../../models/students')
const Joi = require('joi')
const mongodb = require('mongodb')


const headers = Joi.object({
    'authorization': Joi.string().required().description('authentication token of user.'),
    'lan': Joi.string().required().description('specify language (en-english, de-german, etc.). \n \nDefault value : en')
}).unknown()

const payload = Joi.object({
    ids: Joi.array().description('Student Ids which requires to be deleted.')
})

const handler = async (req, h) => {
    const ids = req.payload.ids

    let objectids = ids.map(id => mongodb.ObjectId(id))
    const result = await studentModel.deleteStudent({ _id: { $in: objectids } })

    if (result.deletedCount)
        return h.response({ message: 'Data deleted successfully' }).code(200)
    else if (result.deletedCount === 0)
        return h.response({ message: 'No data found' }).code(404)
    else
        return h.response({ message: 'Internal Server Error' }).code(500)
}

const deleteStudentsRes = {
    200: {
        description: 'Returned If Data Succesfully deleted',
        schema: Joi.object({
            message: Joi.string().example('Data deleted successfully').required()
        })
    },
    // 204: undefined, // pass-through "No Content" to swagger definition
    404: {
        description: 'No student found.',
        schema: Joi.object({
            message: Joi.string().example('No data found').required()
        })
    },
    500: {
        description: 'This error occur while internal server error.',
        schema: Joi.object({
            message: Joi.string().example('Internal server error').required()
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
    }

}


module.exports = { handler, headers, deleteStudentsRes, payload }