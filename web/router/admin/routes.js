const Boom = require('@hapi/boom')
const adminInfo = require('./adminInfo')

module.exports = [
    //Student Admin Data
    {
        method: 'POST',
        path: '/api/studentAdmin',
        config: {
            handler: adminInfo.handler,
            auth: false,
            description: 'API for adding Admin info. ',
            notes: 'It does not require Login. Pass Email,Password,Name & Phone.',
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