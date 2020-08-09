const { createItem } = require("aarketype")
const { readArchetype } = require("../archetype")
const { hashUser } = require("../../util/user")

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
    propertyFilter,
    dataApi
) => {
    //
    const users = await dataApi.readUsers(
        propertyFilter
    )
    return users
}

const readUser = async (
    username,
    dataApi
) => {
    //
    const user = await dataApi.readUser(
        username
    )
    //
    return user
}

const updateUser = async (
    username,
    newProperties,
    dataApi
) => {
    //TODO Validate update.
    //
    await dataApi.updateUser(
        username,
        newProperties
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