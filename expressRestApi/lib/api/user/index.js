

const postUser = async (req, res, next) => {
    const username = req.params.uid
    const password = req.body.password
    const properties = req.body.properties
    //
    await req.createUser(
        username,
        password,
        properties
    )
    //
    res.send()
}

const getUsers = async (req, res, next) => {
    const propertyFilter = req.body.propertyFilter
    //
    const users = await req.userlogg.readUsers(propertyFilter)
    //
    res.json(users)
}

const getUser = async (req, res, next) => { 
    const username = req.params.uid
    //
    const user = await req.userlogg.readUser(username)
    //
    res.json(user)
}

const putUser = async (req, res, next) => {
    const username = req.params.uid
    const newProperties = req.body.newProperties
    //
    await req.userlogg.updateUser(username, newProperties)
    //
    res.send()
}

const deleteUser = async (req, res, next) => { 
    const username = req.params.uid
    //
    await req.userlogg.deleteUser(username)
    //
    res.send
}


/////////////
/////////////


const serveUserApi = (router) => {
    router.post("/userlog/user/:uid", postUser)
    router.get("/userlog/users", getUsers)
    router.get("/userlog/user/:uid", getUser)
    router.put("/userlog/user/:uid", putUser)
    router.delete("/userlog/user/:uid", deleteUser)
}

exports.serveUserApi = serveUserApi