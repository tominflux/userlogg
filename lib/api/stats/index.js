

const readStatsAdmin = async (dataApi) => (
    await dataApi.readStatsAdmin()
)

const readStatsUser = async (dataApi) => (
    await dataApi.readStatsUser()
) 


////////////
////////////


exports.readStatsAdmin = readStatsAdmin
exports.readStatsUser = readStatsUser