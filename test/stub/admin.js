const { ObjectId } = require('mongodb')


const admin = { 
    preInfo: [
        {
            "_id": ObjectId("63231fda2883970208497396"),
            "email": "t1@email.com",
            "password": "62094b72f718cbad75664cfbfc62ed86",
            "name": "test1",
            "phone": "565555"
        },
        {
            "_id": ObjectId("6322a8c5b8ac161947363324"),
            "email": "t2t@email.com",
            "password": "62094b72f718cbad75664cfbfc62ed86",
            "name": "test1",
            "phone": "565555"
        }
    ],
    postInfo: {
        postInfoStub1:  {
            // "_id": ObjectId("632402c0548de915bee3bac6"),
            "email": "t3@email.com",
            "password": "Aa@1bc",
            "name": "test3",
            "phone": "565555"
        },
        postInfoStub2: {
            "_id": ObjectId("63202a14ee10f4ca3bd21644"),
            "email": "t4t@email.com",
            "password": "Aa@1bc",
            "name": "test4",
            "phone": "565555"
        }
    }
}

module.exports = { admin }