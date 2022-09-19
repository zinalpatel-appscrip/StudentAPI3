const { ObjectId } = require('mongodb')


const student = {
    preInfo: [
        {
            "_id": ObjectId("6327f43066e4bdf74e29e9ee"),
            "name": "s9",
            "email": "s9email.com",
            "phone": "323232",
            "preferedSubject": ["Physiscs", "Science"],
            "age": 17,
            "isPresent": true,
            "addmission_date": "1-1-2000",
            "leaving_date": "1-1-2021",
            "contact_person_details": { "relation": "father", "contact": "89845555" },
            "timing": {
                "entry_time": "08:30",
                "exit_time": "05:00"

            }
        },
        {
            "_id": ObjectId("6327f43e66e4bdf74e29e9ef"),
            "name": "s8",
            "email": "s8email.com",
            "phone": "323232",
            "preferedSubject": ["Maths", "Science"],
            "age": 17,
            "isPresent": true,
            "addmission_date": "1-1-2000",
            "leaving_date": "1-1-2021",
            "contact_person_details": { "relation": "father", "contact": "89845555" },
            "timing": {
                "entry_time": "08:30",
                "exit_time": "05:00"

            }
        },
    ],
    // postInfo: {
        studentStub1: {
            "name": "s10",
            "email": "s6@email.com",
            "phone": "323232",
            "preferedSubject": ["Maths", "Science"],
            "age": 17,
            "isPresent": true,
            "addmission_date": "1-1-2000",
            "leaving_date": "1-1-2021",
            "contact_person_details": { "relation": "father", "contact": "89845555" },
            "timing": {
                "entry_time": "08:30",
                    "exit_time": "05:00"
    
             }
        },
        studentStub2: {
            "name": "s11update",
            "email": "s11@email.com",
            "phone": "323232",
            "preferedSubject": ["Maths", "Science"],
            "age": 20,
            "isPresent": true,
            "addmission_date": "1-1-2000",
            "leaving_date": "1-1-2021",
            "contact_person_details": { "relation": "father", "contact": "89845555" },
            "timing": {
                "entry_time": "08:30",
                "exit_time": "05:00"
            }
        },
        studentStub3: {
            "ids": ["6327f43e66e4bdf74e29e9ef"]
        },
        studentStub4: {
            "ids": ["1234"]
        },
        studentStub5: {
            "ids": ["6327f43e66e4bdf74e29e9ea"]
        }
    // }
}

module.exports = { student }