const Hapi = require('@hapi/hapi')
const db = require('../library/mongodb')
require('dotenv').config()
const requireAuth = require('./middleware/requireAuth')
const config = require('../config')

const server = Hapi.server({
    port: process.env.CONNECTION_PORT,
    host: process.env.CONNECTION_HOST
})

const start = async () => {
    await server.register([
        {
            plugin: require('@hapi/inert')
        },
        {
            plugin: require('@hapi/vision')
        },
        {
            plugin: require('hapi-swagger'),
            // options: options
        },
        {
            plugin: require('hapi-auth-jwt2')
        }
    ])
    server.auth.strategy('jwt', 'jwt',
        {
            key: config.auth.SECRET_KEY,
            validate: requireAuth.requireAuth
        }
    )

    server.auth.default('jwt')

    await server.route(require('./router'))

}

const runServer = async () => {
    await start()
    await server.start()
    await db.dbConnect()

    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})


module.exports = { runServer }