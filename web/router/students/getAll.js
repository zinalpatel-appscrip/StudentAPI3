const validatePayload = require('../../commnModels/student/studentModel')
const studentModel = require('../../../models/students')
const StudentJoiSchema = validatePayload.StudentJoiSchema
const Joi = require('joi')

const headers = Joi.object({
    'authorization': Joi.string().required().description('authentication token of user.'),
    'lan': Joi.string().required().description('specify language (en-english, de-german, etc.). \n \nDefault value : en')
}).unknown()

const query = Joi.object({
    name: Joi.string().description('If wanted to search student with name. \n\n name=studentName'),
    email: Joi.string().description('If wanted to search student with email. \n\n email=abc@example.com'),
    phone: Joi.string().description('If wanted to search student with phone. \n\n phone="1234567890"'),
    above: Joi.string().description('Students above specified age will be returned. \n\n above=10'),
    below: Joi.string().description('Students below specified age will be returned. \n\n below=20'),
    page: Joi.string().description('Page number. \n\n Default limit: 3')
})

const handler = async (req, h) => {
    try {
        // const data = req.params.filter
        const name = req.query.name
        const email = req.query.email
        const phone = req.query.phone
        let above = req.query.above
        let below = req.query.below

        if (name || email || phone) {
            let result = await studentModel.aggregate([
                {
                    $match: {
                        $or: [{ name: name }, { email: email }, { phone: phone }]
                    }
                }
            ]).toArray()

            return h.response({ message: 'Data Found!!', data: result }).code(200)
        }

        if (above || below) {

            if (!above) above = 0
            if (!below) below = Number.MAX_SAFE_INTEGER

            let result = await studentModel.aggregate([
                {
                    $match: {
                        $and: [{ age: { $gt: Number(above) } }, { age: { $lt: Number(below) } }]
                    }
                },
                {
                    $skip: (req.query.page - 1) * 3 //per page 3 records
                },
                {
                    $limit: 3
                }
            ]).toArray()

            return h.response({ message: 'Data Found!!', data: result }).code(200)
        }

    } catch (e) {
        console.log(e)
    }


}

const GetAllStudentsRes = {
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

module.exports = { handler, StudentJoiSchema, headers, GetAllStudentsRes, query }