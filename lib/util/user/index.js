const { 
    createArchetype,
    createItem
} = require("aarketype")
const {
    FIELD_TYPE
} = require("ffield")
const { hashPassword } = require("../hash")


const initialArchetype = createArchetype(
    "user", 
    {
        password: FIELD_TYPE.STRING,
        tokens: FIELD_TYPE.ARRAY
    }
)

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

const hashUser = (user, userArchetype) => {
    //TODO validate user item.
    //
    const hashedUserArchetype = getHashedUserArchetype(userArchetype)
    //
    const propsKeys = Object.keys(user.properties)
    let lockedProps = {}
    for (const key of propsKeys) {
        const val = user.properties[key]
        lockedProps = {
            ...lockedProps,
            [key]: val.data
        }
    }
    //
    const {password, ...remainingProps} = lockedProps
    //
    const newProps = {
        ...remainingProps,
        hashedPass: hashPassword(password)
    }
    //
    const hashedUser = createItem(
        hashedUserArchetype,
        user.identifier.data,
        newProps
    )
    //
    return hashedUser
}

exports.initialArchetype = initialArchetype
//exports.getUserArchetype = getUserArchetype
exports.getHashedUserArchetype = getHashedUserArchetype
exports.hashUser = hashUser