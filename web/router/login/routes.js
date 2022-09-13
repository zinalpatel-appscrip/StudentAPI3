const loginApi = require('./login')
const Boom = require('@hapi/boom')

module.exports = [
    {
        method: 'POST',
        path: '/api/login',
        config: {
            handler: loginApi.handler,
            auth: false,
            description: 'API for LogIn. ',
            tags: ['authentication', 'api'],
            plugins: {
                'hapi-swagger': {
                    responses: loginApi.loginRes
                }
            },
            validate: {
                payload: loginApi.payload,
                headers: loginApi.headers,
                failAction(request, h, err) {
                    return Boom.badRequest(`${err.details[0].message}`)
                }
            }
        }
    }
]