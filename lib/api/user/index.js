const { createItem } = require("aarketype")
const { readArchetype } = require("../archetype")
const { hashUser, getHashedUserArchetype } = require("../../util/user")
const { lockItem, unlockItem } = require("@x-logg/util")
const { hashPassword } = require("../../util/hash")

const createUser = async (
    username, 
    password, 
    properties,
    dataApi
) => {
    //
    const archetype = await readArchetype(dataApi)
    //
    const user = createItem(
        archetype,
        username,
        {
            ...properties,
            password
        }
    )
    //
    const hashedUser = hashUser(user, archetype)
    //
    const lockedUser = lockItem(hashedUser)
    //
    await dataApi.createUser(
        lockedUser,
        dataApi
    )
}

const readUsers = async (
    propertyFilter={},
    dataApi
) => {
    //
    const archetype = await readArchetype(dataApi)
    //
    const hashedArchetype = getHashedUserArchetype(archetype)
    //
    const lockedUsers = await dataApi.readUsers(
        propertyFilter
    )
    //
    const hashedUsers = lockedUsers.map(
        lockedUser => unlockItem(lockedUser, hashedArchetype)
    )
    //
    return hashedUsers
}

const readUser = async (
    username,
    dataApi
) => {
    //
    const archetype = await readArchetype(dataApi)
    //
    const hashedArchetype = getHashedUserArchetype(archetype)
    //
    const lockedUser = await dataApi.readUser(
        username
    )
    //
    const hashedUser = unlockItem(lockedUser, hashedArchetype)
    //
    return hashedUser
}

const updateUser = async (
    username,
    newPassword=null,
    newProperties=null,
    dataApi
) => {
    
    const currentLockedUser = await dataApi.readUser(
        username
    )
    /*
    const archetype = await readArchetype(dataApi)
    const hashedArchetype = getHashedUserArchetype(archetype)
    */
    const newHashedPass = (
        (newPassword === null) ? 
            currentLockedUser.properties.hashedPass : 
            hashPassword(newPassword)
    )
    console.log(currentLockedUser)
    //
    const updatedHashedPass = { hashedPass: newHashedPass }
    const updatedProperties = (
        (newProperties === null) ? {} : { ...newProperties }
    )
    const updatedUserProps = {
        ...updatedProperties,
        ...updatedHashedPass
    }
    /*
    const updatedHashedUser = createItem(
        hashedArchetype,
        currentLockedUser.identifier,
        currentLockedUser.properties,
        currentLockedUser.variationFactors
    )
    const updatedLockedUser = lockItem(updatedHashedUser)
    */
    //
    await dataApi.updateUser(
        username,
        updatedUserProps,
        dataApi
    )
}

const deleteUser = async (
    username,
    dataApi
) => {
    //
    await dataApi.deleteUser(
        username
    )
}


/////////////
/////////////


exports.createUser = createUser
exports.readUsers = readUsers
exports.readUser = readUser
exports.updateUser = updateUser
exports.deleteUser = deleteUser