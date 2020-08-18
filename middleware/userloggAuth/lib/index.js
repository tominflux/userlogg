const { genUserloggAuthApi } = require("./api")
const { authAdmin } = require("./middleware/admin")
const { authUser } = require("./middleware/user")


/////////////////
/////////////////


const genUserloggAuthMiddleware = (userloggApi, jwtKey) => {
    //API for logging in/logging out.
    const api = genUserloggAuthApi(userloggApi, jwtKey)
    //Middleware for checking admin auth.
    const adminAuthMiddleware = (req, res, next) => {
        //Add userlogg API and JWT key to request object.
        req.userlogg = userloggApi
        req.jwtKey = jwtKey
        //Call auth admin handler.
        authAdmin(req, res, next)
    }
    //Middleware for checking user auth.
    const userAuthMiddleware = (req, res, next) => {
        //Add userlogg API and JWT key to request object.
        req.userlogg = userloggApi
        req.jwtKey = jwtKey
        //Call auth admin handler.
        authUser(req, res, next)
    }
    //Return bundled object.
    return {
        api: api,
        adminAuth: adminAuthMiddleware,
        userAuth: userAuthMiddleware
    }
}


/////////////////
/////////////////


module.exports = genUserloggAuthMiddleware