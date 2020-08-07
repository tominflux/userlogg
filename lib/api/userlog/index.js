

const createUserlog = async () => {
    //
    await dataApi.createUserlog()
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