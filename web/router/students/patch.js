const validatePayload = require('../../commnModels/student/studentModel')
const studentModel = require('../../../models/students')
const StudentJoiSchema = validatePayload.StudentJoiSchema
const mongodb = require('mongodb')
const Joi = require('joi')

const headers = Joi.object({
    'authorization': Joi.string().required().description('authentication token of user.'),
    'lan': Joi.string().required().description('specify language (en-english, de-german, etc.). \n \nDefault value : en')
}).unknown()

const params = Joi.object({
    id: Joi.string().description('Student ID which needs to be updated.')
})

const handler = async (req, h) => {
    try {
        let res = 'Error'

        //check if resourse exsists
        let data = await studentModel.find({ _id: mongodb.ObjectId(req.params.id) })
        if (data) {
      
            let result = await studentModel.update({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.payload })
            return h.response({ message: 'Data Updated!' }).code(200)
            
        }
        else {
            res = 'requested student not found'
            return h.response({ message: res }).code(404)
        }

    }
    catch (e) {
        console.log(e)
    }
}

const StudentUpadteRes = {
    200: {
        description: 'This status code will be returned if Details are successfully updated!',
        schema: Joi.object({
            message: Joi.string().example('Data Updated!!')
        })
    },
    404: {
        description: 'It will be returned if No data found with given student id',
        schema: Joi.object({
            message: Joi.string().example('requested student not found')
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

module.exports = { handler, StudentJoiSchema, headers, StudentUpadteRes, params }