const db = require('../../library/mongodb')
const tableName = 'studentAdmin'

const insert = (data) => db.get().collection(tableName).insertOne(data)

const insertMany = (data) => db.get().collection(tableName).insertMany(data)


const find = (query) => db.get().collection(tableName).find(query).toArray()

module.exports = { insert, find, insertMany }