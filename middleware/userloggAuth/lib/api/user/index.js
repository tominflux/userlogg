const { checkPassword } = require("@x-logg/util")
const { genUserAuthToken, checkUserToken } = require("../../util/token")


//////////////
//////////////


const postLogin = async (req, res, next) => {
    try {
        //Extract username and password from request.
        const username = req.params.uid
        const password = req.body.password
        //Read the user with specified username.
        const hashedUser = await req.userlogg.readUser(username)
        const hashedPass = hashedUser.properties.hashedPass.data
        //Functions for checking credentials.
        const getUserExists = () => (
            typeof hashedUser !== "undefined" && 
            hashedUser !== null
        )
        const getPasswordCorrect = async () => (
            await checkPassword(
                password,
                hashedPass
            )   
        )
        //Check credentials.
        if (
            !getUserExists() ||
            !(await getPasswordCorrect())
        ) {
            //If either are incorrect, send 401 response.
            res.status(401).send({
                error: `Login failed.`
            })
        } else {
            //If both are correct...
            //Generate JWT token.
            const token = await genUserAuthToken(
                username, 
                req.jwtKey,
                req.userlogg
            )
            //And send in response.
            res.send({
                user: hashedUser,
                token
            })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

const postLogout = async (req, res, next) => {
    const { user, token } = await checkUserToken(req)
    try {
        //Lock user for easy reading.
        const lockedUser = lockItem(user)
        //Get existing tokens and remove request token.
        const existingTokens = lockedUser.properties.tokens
        const updatedTokens = existingTokens.filter(
            existingToken => (existingToken !== token)
        )
        //Update User tokens on DB
        await req.userlogg.updateUser(
            lockedUser.identifier,
            null,
            updatedTokens,
            null
        )
        //Send OK response
        res.send()
    } catch (err) {
        res.status(500).send(err)
    }
}

const postLogoutEverywhere = async (req, res, next) => {
    const { user, token } = await checkUserToken(req)
    try {
        //Lock user for easy reading.
        const lockedUser = lockItem(user)
        //Create empty tokens array
        const updatedTokens = []
        //Update user tokens on DB
        await req.userlogg.updateUser(
            lockedUser.identifier,
            null,
            updatedTokens,
            null
        )
        //Send OK response
        res.send()
    } catch (err) {
        res.status(500).send(err)
    }
}


//////////////
//////////////


const serveUserApi = async (router) => {
    router.post("/user/login/:uid", postLogin)
    router.post("/user/logout", postLogout)
    router.post("/user/logout-everywhere", postLogoutEverywhere)
}


exports.serveUserApi = serveUserApi