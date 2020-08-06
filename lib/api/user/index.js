const { createItem } = require("aarketype")
const { readArchetype } = require("../archetype")

const createUser = async (
    username, 
    password, 
    properties,
    dataApi
) => {
    //
    const archetype = await readArchetype(dataApi)
    //
    const hashedPass = hash(password)
    //
    const user = createItem(
        archetype,
        username,
        {
            ...properties,
            password: hashedPass
        }
    )
    //
    const lockedUser = lockItem(user)
    //
    await dataApi.createUser(

        dataApi
    )
}

const readUsers = async (
    propertyFilter
) => {
    //
    const users = await dataApi.readUsers(
        propertyFilter
    )
}

const readUser = async (
    username
) => {
    //
    const user = await dataApi.readUser(
        username
    )
    //
    return user
}

const deleteUser = async () => {
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
exports.deleteUser = deleteUser