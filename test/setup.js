require('dotenv').config({ path: './.env.test' })

const mongodb = require('../library/mongodb')
const db = require('../library/mongodb')
const stub = require('./stub/index')
// const { ObjectId } = require('mongodb')

module.exports = async function () {
    await mongodb.dbConnect()
    db.get().collection('studentAdmin').insertMany(stub.admin.admin.preInfo)
    // db.get().collection('auth').insertMany()
    db.get().collection('studentInfo').insertMany(stub.student.student.preInfo)
}