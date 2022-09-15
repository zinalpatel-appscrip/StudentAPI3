const Joi = require('joi')

const headerLan = Joi.object({
    'lan': Joi.string().required().description('specify language (en-english, de-german, etc.). \n \nDefault value : en')
}).unknown()

module.exports = { headerLan }