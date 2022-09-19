const mongodb = require('../library/mongodb')

module.exports = async function () {
    const client= mongodb.get()
    let collectionList = await client.listCollections({}, { nameOnly: true }).toArray()
    // console.log(collectionList)

    collectionList.map(async (item) => {
        await client.dropCollection(item.name);
    })
}