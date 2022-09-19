const stub = require('../../stub')
const studentDelete = require('../../../web/router/students/delete')
const mongodb = require('../../../library/mongodb')

beforeAll(async () => {
    await mongodb.dbConnect()
})


test('Should Delete the Specified Student --> Success', async () => {
    let request = { ...stub.request }

    let payload = stub.student.student.studentStub3
    await studentDelete.payload.validateAsync(payload)

    request.payload = payload

    let reply = {
        response: () => {
            const code = (statusCode) => {
                console.log('from reply')
                expect(statusCode).toBe(200)
                console.log(statusCode)

                // done()
            }
            return {
                code
            }
        }
    }

    await studentDelete.handler(request, reply)
    // done()
})

test('Should Get 404 Error --> Success', async () => {
    let request = { ...stub.request }

    let payload = stub.student.student.studentStub5
    await studentDelete.payload.validateAsync(payload)

    request.payload = payload

    let reply = {
        response: () => {
            const code = (statusCode) => {
                console.log('from reply')
                expect(statusCode).toBe(404)
                console.log(statusCode)

                // done()
            }
            return {
                code
            }
        }
    }

    await studentDelete.handler(request, reply)
    // done()
})

test('Should get Internal Server Error --> Success', async () => {
    let request = { ...stub.request }

    let payload = stub.student.student.studentStub4
    await studentDelete.payload.validateAsync(payload)

    request.payload = payload

    let reply = {
        response: () => {
            const code = (statusCode) => {
                console.log('from reply')
                expect(statusCode).toBe(500)
                console.log(statusCode)

                // done()
            }
            return {
                code
            }
        }
    }
    // await mongodb.closeConnection()
    await studentDelete.handler(request, reply)
    // done()
})