const { checkPassword } = require("@x-logg/util")
const { genAdminAuthToken } = require("../../util/token")


//////////////
//////////////


const postLogin = async (req, res, next) => {
    try {
        //Extract username and password from request.
        const username = req.params.aid
        const password = req.body.password
        //Read the admin with specified username.
        const hashedAdmin = await req.userlogg.readAdmin(username)
        //Functions for checking credentials.
        const getAdminExists = () => (
            typeof hashedAdmin !== "undefined" && 
            hashedAdmin !== null
        )
        const getPasswordCorrect = async () => (
            await checkPassword(
                password, hashedAdmin.hashedPass
            )
        )
        //Check credentials.
        if (
            !getAdminExists() ||
            !(await getPasswordCorrect())
        ) {
            //If either are incorrect, send 401 response.
            res.status(401).send({
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
            //And send in response.
            res.send({
                admin: hashedAdmin,
                token
            })
        }
    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
}

//////////////
//////////////


const serveAdminApi = async (router) => {
    router.post("/admin/login/:aid", postLogin)
}


exports.serveAdminApi = serveAdminApi