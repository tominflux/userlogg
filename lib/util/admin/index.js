const { 
    createArchetype,
    createItem
} = require("aarketype")
const {
    FIELD_TYPE
} = require("ffield")
const { lockItem, hashPassword } = require("@x-logg/util")


const adminArchetype = createArchetype(
    "admin",
    {
        password: FIELD_TYPE.STRING,
        tokens: FIELD_TYPE.ARRAY
    }
)

const hashedAdminArchetype = createArchetype(
    "admin",
    {
        hashedPass: FIELD_TYPE.STRING,
        tokens: FIELD_TYPE.ARRAY
    }
)

const hashAdmin = async (admin) => {
    //
    const lockedAdmin = lockItem(admin, adminArchetype)
    //
    const {password, ...remainingProps} = lockedAdmin.properties
    //
    const newProps = {
        ...remainingProps,
        hashedPass: await hashPassword(password)
    }
    //
    const hashedAdmin = createItem(
        hashedAdminArchetype,
        admin.identifier.data,
        newProps
    )
    //
    return hashedAdmin
}

exports.adminArchetype = adminArchetype
exports.hashedAdminArchetype = hashedAdminArchetype
exports.hashAdmin = hashAdmin