const { ObjectId } = require('mongodb')


const student = {
    // preInfo: [
    //     {
    //         "_id": ObjectId("63231fda2883970208497396"),
    //         "email": "t1@email.com",
    //         "password": "62094b72f718cbad75664cfbfc62ed86",
    //         "name": "test1",
    //         "phone": "565555"
    //     },
    //     {
    //         "_id": ObjectId("6322a8c5b8ac161947363324"),
    //         "email": "t2t@email.com",
    //         "password": "62094b72f718cbad75664cfbfc62ed86",
    //         "name": "test1",
    //         "phone": "565555"
    //     }
    // ],
    // postInfo: {
        studentStub1: {
            "name": "s10",
            "email": "s6email.com",
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
    // }
}

module.exports = { student }