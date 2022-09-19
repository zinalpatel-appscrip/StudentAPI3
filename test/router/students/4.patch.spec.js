const stub = require('../../stub')
const studentPatch = require('../../../web/router/students/patch')
const mongodb = require('../../../library/mongodb')

beforeAll(async () => {
    await mongodb.dbConnect()
})




test('Should Get 404 Error --> Success', async () => {
    let request = { ...stub.request }
    let payload = stub.student.student.studentStub2
    await studentPatch.StudentJoiSchema.validateAsync(payload)

    request.params.id = "6322a8c5b8ac161947363324"
    request.payload = payload

    let reply = {
        response: () => {
            const code = (statusCode) => {
                console.log('from reply')
                console.log(statusCode)
                expect(statusCode).toBe(404)
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

test('Should Get 500 -- Internal Server Error --> Success', async () => {
    let request = { ...stub.request }
    let payload = stub.student.student.studentStub2
    await studentPatch.StudentJoiSchema.validateAsync(payload)

    request.params.id = "1234"
    request.payload = payload

    let reply = {
        response: () => {
            const code = (statusCode) => {
                console.log('from reply')
                console.log(statusCode)
                expect(statusCode).toBe(500)
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

test('Should Patch Student --> Success', async () => {
    let request = { ...stub.request }
    let payload = stub.student.student.studentStub2
    await studentPatch.StudentJoiSchema.validateAsync(payload)

    request.params.id = "6327f43e66e4bdf74e29e9ef"
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