const { lockArchetype } = require("@x-logg/util")
const { initialArchetype } = require("../../util/user")

const createUserlog = async (dataApi) => {
    //
    await dataApi.createUserlog()
    //
    const lockedArchetype = lockArchetype(initialArchetype)
    await dataApi.createArchetype(lockedArchetype)
}

const readUserlog = async (dataApi) => {
    //
    const userlogExists = await dataApi.readUserlog()
    //
    return userlogExists
}

const deleteUserlog = async (dataApi) => {
    //
    await dataApi.deleteUserlog()
}


/////////////
/////////////


exports.createUserlog = createUserlog
exports.readUserlog = readUserlog
exports.deleteUserlog = deleteUserlog