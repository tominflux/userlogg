const { FIELD_TYPE } = require("ffield")
const { unlockArchetype } = require("@x-logg/util")


const readArchetype = async (
    dataApi
) => {
    //
    const lockedArchetype = await dataApi.readArchetype()
    //
    const archetype = unlockArchetype(lockedArchetype)
    //
    return archetype
}

const updateArchetype = async (
    newProperties,
    dataApi
) => {
    //
    const updatedProperties = {
        ...newProperties,
        password: FIELD_TYPE.STRING
    }
    //
    await dataApi.updateArchetype(updatedProperties)
}


/////////////
/////////////


exports.readArchetype = readArchetype
exports.updateArchetype = updateArchetype