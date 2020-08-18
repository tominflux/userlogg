const { checkPassword } = require("@x-logg/util")
const { genUserAuthToken } = require("../../util/token")


//////////////
//////////////


const postLogin = async (req, res, next) => {
    try {
        //Extract username and password from request.
        const username = req.params.uid
        const password = req.body.password
        //Read the user with specified username.
        const hashedUser = await req.userlogg.readUser(username)
        //Functions for checking credentials.
        const getUserExists = () => (
            typeof hashedUser !== "undefined" && 
            hashedUser !== null
        )
        const getPasswordCorrect = () => (
            await checkPassword(
                password, hashedUser.hashedPass
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


//////////////
//////////////


const serveUserApi = async (router) => {
    router.post("/user/login/:uid", postLogin)
}


exports.serveUserApi = serveUserApi