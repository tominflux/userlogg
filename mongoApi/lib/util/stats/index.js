const { countInCollection } = require("@x-logg/mongoops")
const { getAdminCollectionName, getUserCollectionName } = require("../misc")


const ENTITY_TYPE = {
    ADMIN: "admin",
    USER: "user"
}

const getCollectionName = (entityType) => {
    switch (entityType) {
        case ENTITY_TYPE.ADMIN:
            return getAdminCollectionName()
        case ENTITY_TYPE.USER:
            return getUserCollectionName()
        default:
            throw new Error(
                `Unknown entity type "${entityType}".`
            )
    }
}

const getEntityCount = async (
    database,
    entityType
) => await countInCollection(
    database,
    getCollectionName(entityType)
)

const getEntityStats = async (
    database,
    entityType
) => {
    const count = await getEntityCount(database, entityType)
    //
    return {
        count
    }
}

exports.ENTITY_TYPE = ENTITY_TYPE
exports.getEntityStats = getEntityStats