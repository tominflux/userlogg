const { checkPassword, lockItem } = require("@x-logg/util")
const { genAdminAuthToken } = require("../../util/token")
const { checkAdminToken } = require("../../util/token")
const { cookieOptions, adminCookieName } = require("../../util/cookie")

//////////////
//////////////


const getLogin = async (req, res, next) => {
    try {
        const { admin, token } = await checkAdminToken(req)
        //Lock admin for easy reading.
        const lockedAdmin = lockItem(admin)
        //
        res.json({
            identifier: lockedAdmin.identifier
        })
    } catch (err) {
        //
        res.status(401).send()
    }
}

const postLogin = async (req, res, next) => {
    try {
        //Extract username and password from request.
        const username = req.params.aid
        const password = req.body.password
        //Read the admin with specified username.
        const hashedAdmin = await req.userlogg.readAdmin(username)
        const hashedPass = hashedAdmin.properties.hashedPass.data
        //Functions for checking credentials.
        const getAdminExists = () => (
            typeof hashedAdmin !== "undefined" && 
            hashedAdmin !== null
        )
        const getPasswordCorrect = async () => (
            await checkPassword(
                password, 
                hashedPass
            )
        )
        //Check credentials.
        if (
            !getAdminExists() ||
            !(await getPasswordCorrect())
        ) {
            //If either are incorrect, send 401 response.
            return res.status(401).send({
                error: (
                    `Login failed.`
                )
            })
        } else {
            //If both are correct...
            //Generate JWT token.
            const token = await genAdminAuthToken(
                username, 
                req.jwtKey,
                req.userlogg
            )
            //And send in cookie.
            res
            .cookie(
                adminCookieName,
                token,
                cookieOptions
            )
            .send()
        }
    } catch (err) {
        console.error(err.message)
        res.status(400).send({
            error: err.message
        })
    }
}

const postLogout = async (req, res, next) => {
    try {
        const { admin, token } = await checkAdminToken(req)
        //Lock admin for easy reading.
        const lockedAdmin = lockItem(admin)
        //Get existing tokens and remove request token.
        const existingTokens = lockedAdmin.properties.tokens
        const updatedTokens = existingTokens.filter(
            existingToken => (existingToken !== token)
        )
        //Update Admin tokens on DB
        await req.userlogg.updateAdmin(
            lockedAdmin.identifier,
            null,
            updatedTokens
        )
        //Send OK response
        res.send()
    } catch (err) {
        res.status(500).send(err)
    }
}

const postLogoutEverywhere = async (req, res, next) => {
    try {
        const { admin, token } = await checkAdminToken(req)
        //Lock admin for easy reading.
        const lockedAdmin = lockItem(admin)
        //Create empty tokens array
        const updatedTokens = []
        //Update admin tokens on DB
        await req.userlogg.updateAdmin(
            lockedAdmin.identifier,
            null,
            updatedTokens
        )
        //Send OK response
        res.send()
    } catch (err) {
        res.status(500).send(err)
    }
}

//////////////
//////////////


const serveAdminApi = async (router) => {
    router.get("/admin/login", getLogin)
    router.post("/admin/login/:aid", postLogin)
    router.post("/admin/logout", postLogout)
    router.post("/admin/logout-everywhere", postLogoutEverywhere)
}


exports.serveAdminApi = serveAdminApi