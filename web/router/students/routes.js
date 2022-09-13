const Boom = require('@hapi/boom')
const postApi = require('./post')
const patchApi = require('./patch')
const getAllApi = require('./getAll')
const getSpecificApi = require('./getSpecific')
const deleteApi= require('./delete')

module.exports = [

    //Student Insert
    {
        method: 'POST',
        path: '/api/students',
        config: {

            handler: postApi.handler,
            description: 'API for Inserting Student Info After LogIn. ',
            // notes: '',
            tags: ['students', 'api'],
            validate: {
                payload: postApi.StudentJoiSchema,
                failAction(request, h, err) {
                    return Boom.badRequest(`${err.details[0].message}`)
                },
                headers: postApi.headers
            },
            plugins: {
                'hapi-swagger': {
                    responses: postApi.StudentInsertRes
                }
            }
        }
    },
    // Update Student
    {
        method: 'PATCH',
        path: '/api/students/{id}',
        config: {

            handler: patchApi.handler,
            description: 'API for updating Student Info After LogIn. ',
            // notes: '',
            tags: ['students', 'api'],
            validate: {
                payload: patchApi.StudentJoiSchema,
                failAction(request, h, err) {
                    console.log(err)
                    return Boom.badRequest(`${err.details[0].message}`)
                },
                headers: patchApi.headers,
                params: patchApi.params
            },
            plugins: {
                'hapi-swagger': {
                    responses: patchApi.StudentUpadteRes,
                }
            },
        }
    },

    //API for search all students
    {
        method: 'GET',
        path: '/api/students',
        config: {

            handler: getAllApi.handler,
            description: 'API for Searching All students ',
            notes: 'Search can done using either students name,email or phone. Or by passing above &/or below age. All keys will be passed as query params with pagination',
            tags: ['students', 'api'],
            plugins: {
                'hapi-swagger': {
                    responses: getAllApi.GetAllStudentsRes,
                    validate: {
                        headers: getAllApi.headers,
                        query: getAllApi.query
                    },
                }
            },
        }
    },

    //API for getting specific student detail
    {
        method: 'GET',
        path: '/api/students/{id}',
        config: {

            handler: getSpecificApi.handler,
            description: 'API for Searching Specific student',
            notes: 'Pass student id in request params.',
            tags: ['students', 'api'],
            plugins: {
                'hapi-swagger': {
                    responses: getSpecificApi.getSpecificStudentRes,
                    validate: {
                        headers: getSpecificApi.headers,
                        params: getSpecificApi.params
                    },
                }
            }
        }
    },

    //API for deleting Students
    {
        method: 'DELETE',
        path: '/api/students',
        config: {

            handler: deleteApi.handler,
            description: 'API for Deleting student records in bulk.',
            notes: 'Student Ids to be deleted will be passed as an array in request body.',
            tags: ['students', 'api'],
            plugins: {
                'hapi-swagger': {
                    responses: deleteApi.deleteStudentsRes,
                    validate: {
                        headers: deleteApi.headers,
                        payload: deleteApi.payload
                    }
                }
            }
        }
    }
    
]