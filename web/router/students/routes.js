const Boom = require('@hapi/boom')
const postApi = require('./post')
const patchApi = require('./patch')
const getAllApi = require('./getAll')
const getSpecificApi = require('./getSpecific')
const deleteApi= require('./delete')
const i18n = require('../../../locales')

module.exports = [

    //Student Insert
    {
        method: 'POST',
        path: '/api/students',
        config: {

            handler: postApi.handler,
            description: i18n.studentApi.insert.ApiDescription,
            notes: i18n.studentApi.insert.ApiNotes,
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
            description: i18n.studentApi.update.ApiDescription,
            notes: i18n.studentApi.update.ApiDescription,
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
            description: i18n.studentApi.getAll.ApiDescription,
            notes: i18n.studentApi.getAll.ApiNotes,
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
            description: i18n.studentApi.getSpecific.ApiDescription,
            notes: i18n.studentApi.getSpecific.ApiNotes,
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
            description: i18n.studentApi.delete.ApiDescription,
            notes: i18n.studentApi.delete.ApiNotes,
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