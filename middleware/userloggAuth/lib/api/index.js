const express = require("express")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { serveAdminApi } = require("./admin")
const { serveUserApi } = require("./user")


/////////////
/////////////


const genUserloggAuthApi = (userloggApi, jwtKey, signedCookieSecret) => {
    //Init router
    const router = express.Router()
    router.use(bodyParser.json())
    router.use(
        cookieParser(signedCookieSecret)
    )
    //Insert userlogg API into request object.
    //As well as JWT key.
    router.use((req, res, next) => {
        req.userlogg = userloggApi
        req.jwtKey = jwtKey
        req.signedCookieSecret = signedCookieSecret
        next()
    })
    //Serve API routes.
    serveAdminApi(router)
    serveUserApi(router)
    //Return router
    return router
}


/////////////
/////////////


exports.genUserloggAuthApi = genUserloggAuthApi