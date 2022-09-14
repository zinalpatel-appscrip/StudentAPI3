const logoutApi = require('./logout')
const i18n = require('../../../locales')

module.exports = [
    //Logout
    {
        method: 'GET',
        path: '/api/logout',
        config: {

            handler: logoutApi.handler,
            description: i18n.logoutApi.ApiDescription,
            notes: i18n.logoutApi.ApiNotes,
            tags: ['authentication', 'api'],
            plugins: {
                'hapi-swagger': {
                    responses: logoutApi.logoutRes
                }
            },
            validate: {
                headers: logoutApi.headers
            }
        }
    }
]