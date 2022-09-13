const Joi = require('joi')

const envVarsSchema = Joi.object({
    SECRET_KEY: Joi.string().required()
}).unknown()

const { value: envVars } = envVarsSchema.validate(process.env)

const config = {
    auth: {
        SECRET_KEY: envVars.SECRET_KEY
    }
}

module.exports = config