const admin = require('./admin')
const login = require('./login')
const students = require('./students')
const logout = require('./logout')



module.exports = [].concat(admin, login, students,logout)