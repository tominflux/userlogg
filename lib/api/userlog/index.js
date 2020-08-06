

const createUserlog = async () => {
    //
    await dataApi.createAdminLog()
    //
    await dataApi.createUserlog()
    //
    await dataApi.createArchetype()
}

const readUserlog = async () => {
    //
    const userlogExists = await dataApi.readUserlog()
    //
    return userlogExists
}

const deleteUserlog = async () => {
    //
    await dataApi.deleteArchetype()
    //
    await dataApi.deleteUserlog()
}


/////////////
/////////////


exports.createUserlog = createUserlog
exports.readUserlog = readUserlog
exports.deleteUserlog = deleteUserlog