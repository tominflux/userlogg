const {
    countInCollection
} = require("@x-logg/mongoops")
const { getUserCollectionName } = require("../../util/misc")

const readStatsUser = async (
    options
) => {
    //
    const { connection, database } = await connect(options)
    //
    const collectionName = getUserCollectionName()
    //
    const count = await countInCollection(database, collectionName)
    //
    connection.close()
    //
    const stats = {
        count
    }
    //
    return stats
}

exports.readStatsUser = readStatsUser