const stub = require('../../stub')
const loginAPI = require('../../../web/router/login/login')
const mongodb = require('../../../library/mongodb')

beforeAll(async () => {
    await mongodb.dbConnect()
})


test('User should be Logged In --> Success', async () => {
    let req = { ...stub.req }
    let payload = stub.login.login.loginStub1

    await loginAPI.payload.validateAsync(payload)

    req.payload = payload

    let reply = {
        response: () => {
            
            const code = (statusCode) => {
                expect(statusCode).toBe(200)
                // done()
            }
            return {
                code
            }
        }
    }
    
    await loginAPI.handler(req, reply)
    // done()
})

test('User should be Unauthorized --> Invalid Credentials', async () => {
    let req = { ...stub.req }
    let payload = stub.login.login.loginStub2

    await loginAPI.payload.validateAsync(payload)

    req.payload = payload

    let reply = {
        response: () => {

            const code = (statusCode) => {
                console.log(' in login callback')
                expect(statusCode).toBe(401)
                // done()
            }
            return {
                code
            }
        }
    }

    await loginAPI.handler(req, reply)
    // done()
})
