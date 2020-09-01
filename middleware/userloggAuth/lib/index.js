const express = require("express")
const cookieParser = require('cookie-parser')
const { genUserloggAuthApi } = require("./api")
const { authAdmin } = require("./middleware/admin")
const { authUser } = require("./middleware/user")


/////////////////
/////////////////


const genUserloggAuthMiddleware = (
    userloggApi, 
    jwtKey,
    signedCookieSecret
) => {
    //API for logging in/logging out.
    const api = genUserloggAuthApi(
        userloggApi, 
        jwtKey,
        signedCookieSecret
    )
    //Middleware for checking admin auth.
    const adminAuthMiddleware = express.Router()
    adminAuthMiddleware.use(
        cookieParser(signedCookieSecret)
    )
    adminAuthMiddleware.use(
        (req, res, next) => {
            //Add userlogg API and JWT key to request object.
            req.userlogg = userloggApi
            req.jwtKey = jwtKey
            req.signedCookieSecret = signedCookieSecret
            //Call auth admin handler.
            authAdmin(req, res, next)
        }
    )
    //Middleware for checking user auth.
    const userAuthMiddleware = express.Router()
    userAuthMiddleware.use(
        cookieParser(signedCookieSecret)
    )
    userAuthMiddleware.use(
        (req, res, next) => {
            //Add userlogg API and JWT key to request object.
            req.userlogg = userloggApi
            req.jwtKey = jwtKey
            req.signedCookieSecret = signedCookieSecret
            //Call auth admin handler.
            authUser(req, res, next)
        }
    )
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