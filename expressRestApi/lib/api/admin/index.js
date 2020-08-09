


const postAdmin = async (req, res, next) => { 
    const username = req.params.uid
    const password = req.body.password
    //
    await req.userlogg.createAdmin(username, password)
    //
    res.send()
}

const getAdmins = async (req, res, next) => {
    const admins = await req.userlogg.readAdmins()
    //
    res.json(admins)
}

const getAdmin = async (req, res, next) => { 
    const username = req.params.uid
    //
    const admin = await req.userlogg.readAdmin(username)
    //
    res.json(admin)
}

const putAdmin = async (req, res, next) => {
    const username = req.params.uid
    const newPassword = req.body.newPassword
    //
    await req.userlogg.updateAdmin(username, newPassword)
    //
    res.send()
}

const deleteAdmin = async (req, res, next) => {
    const username = req.params.uid
    //
    await req.userlogg.deleteAdmin(username)
    //
    res.send()
}


/////////////
/////////////


const serveAdminApi = (router) => {
    router.post("/userlog/admin/:uid", postAdmin)
    router.get("/userlog/admins", getAdmins)
    router.get("/userlog/admin/:uid", getAdmin)
    router.put("/userlog/admin/:uid", putAdmin)
    router.delete("/userlog/admin/:uid", deleteAdmin)
}

exports.serveAdminApi = serveAdminApi