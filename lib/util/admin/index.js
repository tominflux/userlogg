const { 
    createArchetype,
    createItem,
    FIELD_TYPE
} = require("aarketype")


const adminArchetype = createArchetype(
    "admin",
    {
        password: FIELD_TYPE.STRING
    }
)

const hashedAdminArchetype = createArchetype(
    "admin",
    {
        hashedPass: FIELD_TYPE.STRING
    }
)

const hashPassword = (password) => {
    
}

const lockAndHashAdminItem = (adminItem) => {
    const hashedPass = hashPassword
    return {
        archetypeId: adminItem.archetypeId.data,
        identifier: adminItem.identifier.data,
        properties: {
            hashedPass
        }
    }
}

const unlockHashedAdminItem = (lockedAndHashedAdminItem) => {
    const lhai = lockedAndHashedAdminItem
    const unlockedHashedAdminItem = createItem(
        hashedAdminArchetype,
        lhai.identifier,
        {
            hashedPass: lhai.hashedPass
        },
        []
    )
    return unlockedHashedAdminItem
}

exports.adminArchetype = adminArchetype
exports.hashedAdminArchetype = hashedAdminArchetype
exports.hashPassword = hashPassword
exports.lockAndHashAdminItem = lockAndHashAdminItem
exports.unlockHashedAdminItem = unlockHashedAdminItem