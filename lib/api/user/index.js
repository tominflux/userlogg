const { createItem } = require("aarketype")
const { readArchetype } = require("../archetype")
const { hashUser, getHashedUserArchetype } = require("../../util/user")
const { lockItem, unlockItem, hashPassword } = require("@x-logg/util")

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
            password,
            tokens: []
        }
    )
    //
    const hashedUser = await hashUser(user, archetype)
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
    newToken=null,
    updatedProperties=null,
    dataApi
) => {
    //Get existing hashed user.
    const hashedUser = await readUser(username)
    //Hash the new password (if given).
    const hashedPass = (
        newPassword !== null
    ) ? await hashPassword(newPassword) : hashedUser.hashedPass
    //Concat tokens.
    const newTokens = (
        newToken !== null
    ) ? [ newToken ] : []
    const tokens = [
        ...hashedUser.tokens,
        ...newTokens
    ]
    //
    const newProps = (
        updatedProperties !== null
    ) ? { ...updatedProperties } : { ...hashedUser.properties }
    //Concat properties.
    const combinedProps = {
        newProps,
        hashedPass,
        tokens
    }
    //Get user archetype.
    const archetype = await readArchetype(dataApi)
    //Get hashed user archetype.
    const hashedArchetype = getHashedUserArchetype(archetype)
    //Construct new hashed user with updated props.
    const updatedHashedUser = createItem(
        hashedArchetype,
        username,
        combinedProps
    )
    //Lock updated user.
    const updatedLockedUser = lockItem(updatedHashedUser)
    //Update user on database.
    await dataApi.updateUser(updatedLockedUser)
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