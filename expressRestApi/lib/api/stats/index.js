

const ENTITY_TYPE = {
    ADMIN: "admin",
    USER: "user"
}

const getStatsEntity = async (entityType, req, res, next) => {
    const userlogExists = await req.userlogg.readUserlog()
    if (!userlogExists) {
        res.status(404).send()
        return
    }
    switch (entityType) {
        case ENTITY_TYPE.ADMIN: 
            const adminStats = await req.userlogg.readStatsAdmin()
            res.json(adminStats)
            return
        case ENTITY_TYPE.USER:
            const userStats = await req.userlogg.readStatsUser()
            res.json(userStats)
            return
        default: 
            throw new Error(
                `Unknown entity type "${entityType}".`
            )
    }
}


/////////////
/////////////


const getStatsUser = async (req, res, next) => (
    await getStatsEntity(ENTITY_TYPE.USER, req, res, next)
)

const getStatsAdmin = async (req, res, next) => (
    await getStatsEntity(ENTITY_TYPE.ADMIN, req, res, next)
)


/////////////
/////////////


const serveStatsApi = (router) => {
    router.get("/userlog/stats/admin", getStatsAdmin)
    router.get("/userlog/stats/user", getStatsUser)
}

exports.serveStatsApi = serveStatsApi