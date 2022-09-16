const stub = require('../../stub')
const logoutAPI = require('../../../web/router/logout/logout')
const mongodb = require('../../../library/mongodb')

beforeAll(async () => {
    await mongodb.dbConnect()
})


test('User should be Logged Out --> Success', async () => {
    let request = { ...stub.request }
    
    let reply = {
        response: () => {
            
            const code = (statusCode) => {
                console.log('in callback')
                expect(statusCode).toBe(200)
                // done()
            }
            return {
                code
            }
        }
    }
    
    await logoutAPI.handler(request, reply)
    // done()
})

test('User should get internal server error --> Success', async () => {
    console.log('in internal server test')
    let request = { ...stub.request }

    let reply = {
        response: () => {

            const code = (statusCode) => {
                console.log('internal server error')
                expect(statusCode).toBe(500)
            }
            return {
                code
            }
        }
    }
    await mongodb.closeConnection()
    await logoutAPI.handler(request, reply)
    // done()
})