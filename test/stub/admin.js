const { ObjectId } = require('mongodb')


const admin = { 
    adminInfo: [
        {
            "_id": ObjectId("63231fda2883970208497396"),
            "email": "t1t2@email.com",
            "password": "440ac85892ca43ad26d44c7ad9d47d3e",
            "name": "test1",
            "phone": "565555"
        }
    ]
}

module.exports = { admin }