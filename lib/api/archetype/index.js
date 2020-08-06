


const readArchetype = async (
    dataApi
) => {
    //
    const archetype = await dataApi.readArchetype()
    //
    return archetype
}

const updateArchetype = async (
    newProperties,
    dataApi
) => {
    //
    await dataApi.updateArchetype(newProperties)
}


/////////////
/////////////


exports.readArchetype = readArchetype
exports.updateArchetype = updateArchetype