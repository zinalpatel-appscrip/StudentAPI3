const admin = require('./admin')
const student = require('./student')
const login = require('./login')
const { req } = require('./req')
const { request } = require('./request')



module.exports = { admin, req, login, request, student }