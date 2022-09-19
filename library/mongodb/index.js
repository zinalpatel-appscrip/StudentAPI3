// require('dotenv').config()

const { MongoClient } = require('mongodb')
const url = process.env.CONNECTION_URL
const client = new MongoClient(url)
let db

async function main() {
    try {
        let result = await client.connect()
        db = result.db(process.env.DATABASE_NAME)
        // return db.collection(collectionName)
        // console.log(db)
        console.log(`Connected with ${process.env.DATABASE_NAME}`)
        
    } catch (e) {
        console.log(e)
    }
}

// const dbObj = dbConnect()

exports.dbConnect = () => main()
exports.get = () => { return db }
exports.closeConnection = async () => {  
    console.log('in closeconnection')    
    await client.close() 
} 