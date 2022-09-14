const inert = require('@hapi/inert')
const vision = require('@hapi/vision')


const swagger = {
    plugin: require('hapi-swagger'),
    options : {
        grouping: 'tags',
        info: {
            title: 'Student API',
            version: '0.0.1',
            contact: {
                name: "Appscrip",
                email: "appscrip@web.com",
            },
        }
    }
}

module.exports = { inert,vision,swagger }