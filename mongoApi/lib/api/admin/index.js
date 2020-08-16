const {
    connect,
    insertIntoCollection,
    findInCollection,
    updateInCollection,
    deleteFromCollection
} = require("@x-logg/mongoops")
const { getAdminCollectionName } = require("../../util/misc")

const createAdmin = async (
    options,
    lockedAndHashedAdmin
) => {
    //
    const { connection, database } = await connect(options)
    //
    const adminColName = getAdminCollectionName()
    //
    const documents = [ lockedAndHashedAdmin ]
    //
    await insertIntoCollection(
        database,
        adminColName,
        documents
    )
    //
    connection.close()
}

const readAdmins = async (
    options
) => {
    //
    const { connection, database } = await connect(options)
    //
    const adminColName = getAdminCollectionName()
    //
    const query = { }
    //
    const lockedAndHashedAdmins = await findInCollection(
        database,
        adminColName,
        query
    )
    //
    connection.close()
    //
    return lockedAndHashedAdmins
}

const readAdmin = async (
    options,
    identifier
) => {
    //
    const { connection, database } = await connect(options)
    //
    const adminColName = getAdminCollectionName()
    //
    const query = { identifier }
    //
    const lockedAdmins = await findInCollection(
        database,
        adminColName,
        query
    )
    //
    connection.close()
    //
    const admin = (
        lockedAdmins.length > 0
    ) ? lockedAdmins[0] : null
    //
    return admin
}

const updateAdmin = async (
    options, 
    lockedAdmin
) => {
    //
    const { connection, database } = await connect(options)
    //
    const adminColName = getAdminCollectionName()
    //
    const query = { identifier: lockedAdmin.identifier }
    //Build object of updated properties.
    const values = {
        properties: lockedAdmin.properties
    }
    //
    await updateInCollection(
        database,
        adminColName,
        query,
        values
    )
    //
    connection.close()
}

const deleteAdmin = async (
    options,
    identifier
) => {
    //
    const { connection, database } = await connect(options)
    //
    const adminColName = getAdminCollectionName()
    //
    const query = { identifier }
    //
    await deleteFromCollection(
        database,
        adminColName,
        query
    )
    //
    connection.close()
}

exports.createAdmin = createAdmin
exports.readAdmins = readAdmins
exports.readAdmin = readAdmin
exports.updateAdmin = updateAdmin
exports.deleteAdmin = deleteAdmin