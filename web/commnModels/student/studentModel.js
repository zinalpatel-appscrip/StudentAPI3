const Joi = require('joi')

const StudentJoiSchema = Joi.object().keys({
    name: Joi.string()
        .required(),

    email: Joi.string()
        .email()
        .min(5)
        .max(15)
        .required(),

    phone: Joi.string()
        .optional(),

    //string or array of strings , items of array must be a string
    preferedSubject: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string())
    ),

    age: Joi.number().required(),

    isPresent: Joi.boolean().valid(true, false, 0, 1).required(),

    addmission_date: Joi.date().less('now').required(),

    leaving_date: Joi.date().greater(Joi.ref('addmission_date')).required(),

    contact_person_details: Joi.object({
        // "relation": Joi.string().required()
        "contact": Joi.string().required()
    }).unknown().description('anything'),

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
    }),

    "extraInfo": Joi.any().description('this key will match anything you give it')

}).options({ abortEarly: false });

module.exports = { StudentJoiSchema }