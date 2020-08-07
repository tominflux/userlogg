const {
    createItem
} = require("aarketype")
const { 
    adminArchetype, 
    lockAndHashAdminItem, 
    unlockHashedAdminItem, 
    hashPassword 
} = require("../../util/admin")


const createAdmin = async (
    username,
    password,
    dataApi
) => {
    //
    const admin = createItem(
        adminArchetype,
        username, 
        { password },
        []
    )
    //
    const lockedAndHashedAdmin = lockAndHashAdminItem(admin)
    //
    await dataApi.createAdmin(lockedAndHashedAdmin)
}

const readAdmins = async (
    dataApi
) => {
    //
    const lockedAndHashedAdmins = await dataApi.readAdmins()
    //
    const hashedAdmins = lockedAndHashedAdmins.map(
        lha => unlockHashedAdminItem(lha)
    )
    //
    return hashedAdmins
}

const readAdmin = async (
    username,
    dataApi
) => {
    //
    const lockedAndHashedAdmin = await dataApi.readAdmin(username)
    //
    const hashedAdmin = unlockHashedAdminItem(lockedAndHashedAdmin)
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