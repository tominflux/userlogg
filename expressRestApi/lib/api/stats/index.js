

const getStatsUser = async (req, res, next) => {
    const userlogExists = await req.userlogg.readUserlog()
    if (!userlogExists) {
        res.status(404).send()
        return
    }
    const userStats = await req.userlogg.readStatsUser()
    res.json(userStats)
}


/////////////
/////////////


const serveStatsApi = (router) => {
    router.get("/stats/userlog/user", getStatsUser)
}

exports.serveStatsApi = serveStatsApi