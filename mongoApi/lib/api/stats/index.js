const { connect } = require("@x-logg/mongoops")
const { getEntityStats, ENTITY_TYPE } = require("../../util/stats")


///////////
///////////


const readStatsEntity = async (
    options,
    entityType
) => {
    const { connection, database } = await connect(options)
    const stats = await getEntityStats(database, entityType)
    connection.close()
    return stats
}


///////////
///////////


const readStatsAdmin = async (options) => (
    await readStatsEntity(options, ENTITY_TYPE.ADMIN)
)

const readStatsUser = async (options) => (
    await readStatsEntity(options, ENTITY_TYPE.USER)
)

///////////
///////////


exports.readStatsAdmin = readStatsAdmin
exports.readStatsUser = readStatsUser