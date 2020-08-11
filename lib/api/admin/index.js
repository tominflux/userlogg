const {
    createItem
} = require("aarketype")
const { 
    adminArchetype, 
    hashAdmin,
    hashedAdminArchetype
} = require("../../util/admin")
const { lockItem, unlockItem } = require("@x-logg/util")
const { hashPassword } = require("../../util/hash")


const createAdmin = async (
    username,
    password,
    dataApi
) => {
    //
    const admin = createItem(
        adminArchetype,
        username, 
        { password }
    )
    //
    const hashedAdmin = hashAdmin(admin)
    //
    const lockedAdmin = lockItem(hashedAdmin)
    //
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
    newPassword,
    dataApi
) => {
    //
    const hashedPass = await hashPassword(newPassword)
    //
    await dataApi.updateAdmin(username, hashedPass)
}

const deleteAdmin = async (
    username, 
    dataApi
) => {
    //
    await dataApi.deleteAdmin(username)
}


/////////////
/////////////


exports.createAdmin = createAdmin
exports.readAdmins = readAdmins
exports.readAdmin = readAdmin
exports.updateAdmin = updateAdmin
exports.deleteAdmin = deleteAdmin