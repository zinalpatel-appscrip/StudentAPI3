const stub = require('../../stub')
const adminPost = require('../../../web/router/admin/adminInfo')
const mongodb = require('../../../library/mongodb')

beforeAll(async()=>{
    await mongodb.dbConnect()
})


test('Should Create Admin --> Success',async ()=>{
    let req = { ...stub.req}
    let payload = stub.admin.admin.postInfo.postInfoStub1

    await adminPost.UserJoiSchema.validateAsync(payload)

    req.payload = payload

    let reply = {
        response: () => {
            const code = (statusCode) => {
                expect(statusCode).toBe(201)
                // done()
            }
            return {
                code
            }
        }
    }

    adminPost.handler(req,reply)
    // done()
})
