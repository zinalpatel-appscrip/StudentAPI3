const stub = require('../../stub')
const studentPatch = require('../../../web/router/students/patch')
const mongodb = require('../../../library/mongodb')

beforeAll(async () => {
    await mongodb.dbConnect()
})


test('Should Patch Student --> Success', async () => {
    let request = { ...stub.request }
    let payload = stub.student.student.studentStub2
    await studentPatch.StudentJoiSchema.validateAsync(payload)

    request.params.id = "6321a4e2da99f757437ee290"
    request.payload = payload

    let reply = {
        response: () => {
            const code = (statusCode) => {
                console.log('from reply')
                console.log(statusCode)
                expect(statusCode).toBe(200)
                console.log(statusCode)
            }
            return {
                code
            }
        }
    }

    await studentPatch.handler(request, reply)
    // done()
})