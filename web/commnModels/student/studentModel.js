const Joi = require('joi')
const i18n = require('../../../locales')

const StudentJoiSchema = Joi.object().keys({
    name: Joi.string()
        .example('abc')
        .description(i18n.studentApi.insert.fieldsDescription.name)
        .required(),

    email: Joi.string()
        .email()
        .example('abc@example.com')
        .description(i18n.studentApi.insert.fieldsDescription.email)
        .required(),

    phone: Joi.string()
        .example('1234567890')
        .description(i18n.studentApi.insert.fieldsDescription.phone)
        .optional(),

    //string or array of strings , items of array must be a string
    preferedSubject: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string())
    )
    ,

    age: Joi.number().required().example('17')
        .description(i18n.studentApi.insert.fieldsDescription.age),

    isPresent: Joi.boolean().valid(true, false, 0, 1)
    .example('true')
        .description(i18n.studentApi.insert.fieldsDescription.isPresent)
    .required(),

    addmission_date: Joi.date().less('now').required()
        .example('12/9/2000')
        .description(i18n.studentApi.insert.fieldsDescription.addmission_date)
    ,

    leaving_date: Joi.date().greater(Joi.ref('addmission_date'))
    .example('12/9/2022')
    .description(i18n.studentApi.insert.fieldsDescription.leaving_date)
    .required(),

    contact_person_details: Joi.object({
        // "relation": Joi.string().required()
        "contact": Joi.string().required()
    }).unknown().description('anything')
        .example('{cnatact:"44545"}')
        .description(i18n.studentApi.insert.fieldsDescription.contact_person_details)
    ,

    //If student is present then take Entry & exit timing
    timing: Joi.object().when('isPresent', {
        is: Joi.alternatives().try(
            true,
            1
        ),
        then: Joi.object({
            "entry_time": Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
            "exit_time": Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/)
        }).required()
    })
    .description(i18n.studentApi.insert.fieldsDescription.timing),

    "extraInfo": Joi.any().description(i18n.studentApi.insert.fieldsDescription.extraInfo)

}).options({ abortEarly: false });

module.exports = { StudentJoiSchema }