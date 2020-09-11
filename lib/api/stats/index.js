

const readStatsUser = async (
    dataApi
) => {
    //
    const stats = await dataApi.readStatsUser()
    //
    return stats
}

exports.readStatsUser = readStatsUser