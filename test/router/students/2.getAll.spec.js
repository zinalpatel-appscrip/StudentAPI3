const stub = require('../../stub')
const studentGetAll = require('../../../web/router/students/getAll')
const mongodb = require('../../../library/mongodb')

beforeAll(async () => {
    await mongodb.dbConnect()
})


test('Should Return All Students based on query --> Success', async () => {
    let request = { ...stub.request }

    request.query = {name:"s8"}

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

    await studentGetAll.handler(request, reply)
    // done()
})

test('Should get Internal Server Error --> Success', async () => {
    let request = { ...stub.request }

    request.query = { name: "s8" }

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
    await mongodb.closeConnection()
    await studentGetAll.handler(request, reply)
    // done()
})
