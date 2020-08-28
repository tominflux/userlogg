const {
    createItem
} = require("aarketype")
const { 
    adminArchetype, 
    hashAdmin,
    hashedAdminArchetype
} = require("../../util/admin")
const { lockItem, unlockItem, hashPassword } = require("@x-logg/util")


const createAdmin = async (
    username,
    password,
    dataApi
) => {
    //Create admin item (with specified partner and empty tokens).
    const admin = createItem(
        adminArchetype,
        username, 
        { 
            password,
            tokens: []
        }
    )
    //Hash the admin item (replaces password with hashed password).
    const hashedAdmin = await hashAdmin(admin)
    //Lock the admin item (suitable form for passing to database).
    const lockedAdmin = lockItem(hashedAdmin)
    //Add to the admin to the database.
    await dataApi.createAdmin(lockedAdmin)
}

const readAdmins = async (
    dataApi
) => {
    //
    const lockedAdmins = await dataApi.readAdmins()
    //
    const hashedAdmins = lockedAdmins.map(
        lockedAdmin => unlockItem(lockedAdmin, hashedAdminArchetype)
    )
    //
    return hashedAdmins
}

const readAdmin = async (
    username,
    dataApi
) => {
    //
    const lockedAdmin = await dataApi.readAdmin(username)
    //
    const hashedAdmin = unlockItem(lockedAdmin, hashedAdminArchetype)
    //
    return hashedAdmin
}

const updateAdmin = async (
    username,
    newPassword=null,
    updatedTokens=null,
    dataApi
) => {
    //Get existing hashed admin.
    const hashedAdmin = await readAdmin(username, dataApi)
    //Hash the new password (if given).
    const hashedPass = (
        (newPassword !== null) ? 
            await hashPassword(newPassword) : 
            hashedAdmin.properties.hashedPass.data
    )
    //Concat tokens.
    const tokens = (
        (updatedTokens !== null) ? 
            [...updatedTokens] : 
            hashedAdmin.properties.tokens.data
    )
    //Construct new hashed admin with updated props.
    const updatedHashedAdmin = createItem(
        hashedAdminArchetype,
        username,
        {
            ...hashedAdmin.properties,
            hashedPass,
            tokens
        }
    )
    //Lock updated hashed admin.
    const updatedLockedAdmin = lockItem(updatedHashedAdmin)
    //Update admin on database.
    await dataApi.updateAdmin(updatedLockedAdmin)
}

const deleteAdmin = async (
    username, 
    dataApi
) => {
    //Delete admin on database.
    await dataApi.deleteAdmin(username)
}


/////////////
/////////////


exports.createAdmin = createAdmin
exports.readAdmins = readAdmins
exports.readAdmin = readAdmin
exports.updateAdmin = updateAdmin
exports.deleteAdmin = deleteAdmin