const { 
    createArchetype,
    createItem,
    FIELD_TYPE
} = require("aarketype")
const { hashPassword } = require("../hash")


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

const hashAdmin = (admin) => {
    //TODO: validate admin item.
    //
    const {password, ...remainingProps} = admin.properties
    //
    const newProps = {
        ...remainingProps,
        hashedPass: hashPassword(password)
    }
    //
    const hashedAdmin = createItem(
        hashedAdminArchetype,
        admin.identifier.data,
        newProps,
        []
    )
    //
    return hashedAdmin
}

exports.adminArchetype = adminArchetype
exports.hashedAdminArchetype = hashedAdminArchetype
exports.hashAdmin = hashAdmin