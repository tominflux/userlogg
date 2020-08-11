

const postUserlog = async (req, res, next) => {
    await req.userlogg.createUserlog()
    //
    res.send()
}

const getUserlog = async (req, res, next) => {
    const userlog = await req.userlogg.readUserlog()
    //
    res.json(userlog)
}

const deleteUserlog = async (req, res, next) => {
    await req.userlogg.deleteUserlog()
    //
    res.send()
}


//////////
//////////


const serveUserlogApi = (router) => {
    router.post("/userlog", postUserlog)
    router.get("/userlog", getUserlog)
    router.delete("/userlog", deleteUserlog)
}

exports.serveUserlogApi = serveUserlogApi