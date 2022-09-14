const Boom = require('@hapi/boom')
const adminInfo = require('./adminInfo')
const i18n = require('../../../locales')

module.exports = [
    //Student Admin Data
    {
        method: 'POST',
        path: '/api/studentAdmin',
        config: {
            handler: adminInfo.handler,
            auth: false,
            description: i18n.adminApi.ApiDescription,
            notes: i18n.adminApi.ApiNotes,
            tags: ['admin', 'api'],
            validate: {
                payload: adminInfo.UserJoiSchema,
                headers: adminInfo.headers,
                failAction(request, h, err) {
                    const res = err.hasOwnProperty('details') ? err.details[0].message : err.output.payload.message

                    return Boom.badRequest(res)
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: adminInfo.studentAdminRes
                }
            },
        }
    }
]