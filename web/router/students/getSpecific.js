const validatePayload = require('../../commnModels/student/studentModel')
const studentModel = require('../../../models/students') 
const StudentJoiSchema = validatePayload.StudentJoiSchema
const Joi = require('joi')
const mongodb = require('mongodb')
const headers = Joi.object({
    'authorization': Joi.string().required().description('authentication token of user.'),
    'lan': Joi.string().required().description('specify language (en-english, de-german, etc.). \n \nDefault value : en')
}).unknown()

const params = Joi.object({
    id: Joi.string().description('Student id which is to be searched.')
})

const handler = async (req, h) => {
    try {
        const id = req.params.id

        const student = await studentModel.find({
            _id: mongodb.ObjectId(id)
        })

        if (student.length)
            return h.response({ message: 'Data Found!!', data: student }).code(200)
        else
            return h.response({ message: 'This student is not exsists' }).code(404)
    } catch (e) {
        console.log(e)
    }
}

const getSpecificStudentRes = {
    200: {
        description: 'This status code will be returned if Details are found.',
        schema: Joi.object({
            message: Joi.string().example('Data Found!!'),
            data: Joi.array().example([
                {
                    "_id": "63196f322ee2e759e0f0f9a1",
                    "name": "s1",
                    "email": "s1@email.com",
                    "phone": "454545",
                    "preferedSubject": [
                        "Maths",
                        "Science"
                    ],
                    "age": 22,
                    "isPresent": true,
                    "addmission_date": "1-1-2000",
                    "leaving_date": "1-1-2021",
                    "contact_person_details": {
                        "relation": "father",
                        "contact": "89845555"
                    },
                    "timing": {
                        "entry_time": "08:30",
                        "exit_time": "05:00"
                    }
                },
            ])
        })
    },
    404: {
        description: 'This status code will be returned if NO Details are found.',
        schema: Joi.object({
            message: Joi.string().example("This student is not exsists")
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

module.exports = { handler, StudentJoiSchema, headers, getSpecificStudentRes, params }