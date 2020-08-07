const {
    connect,
    createMongoCollection,
    getMongoCollections,
    deleteMongoCollection
} = require("@x-logg/mongoops")
const { 
    getAdminCollectionName, 
    getUserCollectionName, 
    getArchetypeCollectionName 
} = require("../../util/misc")


const createUserlog = async (options) => {
    //
    const { connection, database } = await connect(options)
    //
    const adminColName = getAdminCollectionName()
    const userColName = getUserCollectionName()
    const archColName = getArchetypeCollectionName()
    //
    await createMongoCollection(database, adminColName)
    await createMongoCollection(database, userColName)
    await createMongoCollection(database, archColName)
    //
    connection.close()
}

const readUserlog = async (options) => {
    //
    const { connection, database } = await connect(options)
    //
    let userloggCollectionExists = false
    //
    const collectionNames = await getMongoCollections(database)
    for (const collectionName of collectionNames) {
        const isUserloggCollection = (
            collectionName.substr(0, 10) === "userlogg__"
        )
        if (isUserloggCollection) {
            userloggCollectionExists = true
            break
        }
    }
    //
    connection.close()
    //
    return userloggCollectionExists
}

const deleteUserlog = async (options) => {
    //
    const { connection, database } = await connect(options)
    //
    const adminColName = getAdminCollectionName()
    const userColName = getUserCollectionName()
    const archColName = getArchetypeCollectionName()
    //
    await deleteMongoCollection(database, adminColName)
    await deleteMongoCollection(database, userColName)
    await deleteMongoCollection(database, archColName)
    //
    connection.close()
}

exports.createUserlog = createUserlog
exports.readUserlog = readUserlog
exports.deleteUserlog = deleteUserlog