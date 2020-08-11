const { FIELD_TYPE } = require("ffield")


const readArchetype = async (
    dataApi
) => {
    //
    const lockedArchetype = await dataApi.readArchetype()
    //
    return lockedArchetype
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