const logoutApi = require('./logout')

module.exports = [
    //Logout
    {
        method: 'GET',
        path: '/api/logout',
        options: {

            handler: logoutApi.handler,
            description: 'API for Logout',
            notes: 'Pass Valid JWT Token in Headers.',
            tags: ['authentication', 'api'],
            plugins: {
                'hapi-swagger': {
                    responses: logoutApi.logoutRes,
                    validate: {
                        headers: logoutApi.headers
                    }
                }
            }
        }
    }
]