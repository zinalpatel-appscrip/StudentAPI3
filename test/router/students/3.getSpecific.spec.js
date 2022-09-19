const stub = require('../../stub')
const studentGetSpecific = require('../../../web/router/students/getSpecific')
const mongodb = require('../../../library/mongodb')

beforeAll(async () => {
    await mongodb.dbConnect()
})


test('Should Return Specified Student based on given ID --> Success', async () => {
    let request = { ...stub.request }

    request.params.id = "6327f43066e4bdf74e29e9ee"

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

    await studentGetSpecific.handler(request, reply)
    // done()
})

test('Should get Internal Server Error --> Success', async () => {
    let request = { ...stub.request }

    request.params.id = "124"

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
    await studentGetSpecific.handler(request, reply)
    // done()
})