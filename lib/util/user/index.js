const { 
    createArchetype,
    createItem,
    FIELD_TYPE
} = require("aarketype")

/*
const getUserArchetype = async (
    dataApi
) => {
    //
    const archetype = await dataApi.readArchetype()
    //
    return archetype
}
*/

const getHashedUserArchetype = (
    userArchetype
) => {
    //
    const {password, ...remainingProps} = userArchetype.properties
    //
    const newProps = {
        ...remainingProps,
        hashedPass: FIELD_TYPE.STRING
    }
    //
    const hashedArch = createArchetype(
        userArchetype.identifier.data,
        newProps
    )
    //
    return hashedArch
}

const hashUser = async (user, userArchetype) => {
    //TODO validate user item.
    //
    const hashedUserArchetype = getHashedUserArchetype(userArchetype)
    //
    const rawProps = user.properties.map(
        prop => prop.data
    )
    const {password, ...remainingProps} = rawProps
    //
    const newProps = {
        ...remainingProps,
        hashedPass: hashPassword(password)
    }
    //
    const hashedUser = createItem(
        hashedUserArchetype,
        user.identifier.data,
        newProps,
        []
    )
    //
    return hashedUser
}

//exports.getUserArchetype = getUserArchetype
exports.getHashedUserArchetype = getHashedUserArchetype
exports.hashUser = hashUser