const {
    connect,
    insertIntoCollection,
    findInCollection,
    updateInCollection
} = require("@x-logg/mongoops")
const { getArchetypeCollectionName } = require("../../util/misc")

const createArchetype = async (
    options,
    lockedArchetype
) => {
    //
    const { connection, database } = await connect(options)
    //
    const archColName = getArchetypeCollectionName()
    //
    await insertIntoCollection(
        database,
        archColName,
        [ lockedArchetype ]
    )
    //
    connection.close()
}

const readArchetype = async (
    options
) => {
    //
    const { connection, database } = await connect(options)
    //
    const archColName = getArchetypeCollectionName()
    //
    const query = {}
    //
    const archetypes = await findInCollection(
        database,
        archColName,
        query
    )
    //
    connection.close()
    //
    const archetype = (
        archetypes.length > 0
    ) ? archetypes[0] : null
    //
    return archetype
}

const updateArchetype = async (
    options,
    newProperties
) => {
    //
    const { connection, database } = await connect(options)
    //
    const archColName = getArchetypeCollectionName()
    //
    const query = {}
    //
    const values = {
        properties: newProperties
    }
    //
    await updateInCollection(
        database,
        archColName,
        query,
        values
    )
    //
    connection.close()
}

exports.createArchetype = createArchetype
exports.readArchetype = readArchetype
exports.updateArchetype = updateArchetype