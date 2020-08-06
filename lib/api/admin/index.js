


const createAdmin = async (
    username,
    password,
    dataApi
) => {
    //
    await dataApi.createAdmin(username, password)
}

const readAdmins = async (

) => {
    //
    const admins = await dataApi.readAdmins()
    //
    return admins
}

const deleteAdmin = async (
    username, 
    dataApi
) => {
    //
    await dataApi.deleteAdmin(username)
}


/////////////
/////////////


exports.createAdmin = createAdmin
exports.readAdmins = readAdmins
exports.deleteAdmin = deleteAdmin