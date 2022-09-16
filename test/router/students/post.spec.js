const stub = require('../../stub')
const studentPost = require('../../../web/router/students/post')
const mongodb = require('../../../library/mongodb')

beforeAll(async () => {
    await mongodb.dbConnect()
})


test('Should Create Student --> Success', async () => {
    let request = { ...stub.request }
    let payload = stub.student.student.studentStub1
    await studentPost.StudentJoiSchema.validateAsync(payload)

    request.payload = payload

    let reply = {
        response: () => {
            const code = (statusCode) => {
                console.log('from reply')
                expect(statusCode).toBe(201)
                // done()
            }
            return {
                code
            }
        }
    }

    await studentPost.handler(request, reply)
    // done()
})
