const db = require('../../library/mongodb')
const tableName = 'studentInfo'

const insert = (data) => db.get().collection(tableName).insertMany(data)

const find = (data) => db.get().collection(tableName).find(data).toArray()

const update = (condition, data) => db.get().collection(tableName).updateOne(condition,data)

const aggregate = (query) => db.get().collection(tableName).aggregate(query)

const deleteStudent = (query) => db.get().collection(tableName).deleteMany(query)



module.exports = { insert, find, update, aggregate, deleteStudent }