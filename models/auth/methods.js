const db = require('../../library/mongodb')
const tableName = 'auth'

const replaceOne = (condition, data) => db.get().collection(tableName).replaceOne(condition,data,{ upsert: true })

const deleteOne  = (condition) => db.get().collection(tableName).deleteOne(condition)

const aggregate = (query) => db.get().collection(tableName).aggregate(query)


module.exports = { replaceOne, deleteOne, aggregate }