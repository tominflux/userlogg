const {
    connect,
    insertIntoCollection,
    findInCollection,
    updateInCollection,
    deleteFromCollection
} = require("@x-logg/mongoops")
const { getUserCollectionName } = require("../../util/misc")

const createUser = async (
    options,
    lockedUser
) => {
    //
    const { connection, database } = await connect(options)
    //
    const userColName = getUserCollectionName()
    //
    const documents = [ lockedUser ]
    //
    await insertIntoCollection(
        database,
        userColName,
        documents
    )
    //
    connection.close()
}

const readUsers = async (
    options,
    propertyFilter
) => {
    //
    const { connection, database } = await connect(options)
    //
    const userColName = getUserCollectionName()
    //
    const query = (
        ([...Object.keys(propertyFilter)].length > 0) ? 
            {
                properties: {
                    ...propertyFilter
                } 
            } : null
    )
    //
    const users = await findInCollection(
        database,
        userColName,
        query
    )
    //
    connection.close()
    //
    return users
}

const readUser = async (
    options,
    identifier
) => {
    //
    const { connection, database } = await connect(options)
    //
    const userColName = getUserCollectionName()
    //
    const query = { identifier }
    //
    const users = await findInCollection(
        database,
        userColName,
        query
    )
    //
    connection.close()
    //
    const user = (
        users.length > 0
    ) ? users[0] : null
    //
    return user
}

const updateUser = async (
    options, 
    lockedUser
) => {
    //
    const { connection, database } = await connect(options)
    //
    const userColName = getUserCollectionName()
    //
    const query = { identifier: lockedUser.identifier }
    //
    const values = { properties: lockedUser.properties } 
    //
    await updateInCollection(
        database,
        userColName,
        query,
        values
    )
    //
    connection.close()
}

const deleteUser = async (
    options,
    identifier
) => {
    //
    const { connection, database } = await connect(options)
    //
    const userColName = getUserCollectionName()
    //
    const query = { identifier }
    //
    await deleteFromCollection(
        database,
        userColName,
        query
    )
    //
    connection.close()
}

exports.createUser = createUser
exports.readUsers = readUsers
exports.readUser = readUser
exports.updateUser = updateUser
exports.deleteUser = deleteUser