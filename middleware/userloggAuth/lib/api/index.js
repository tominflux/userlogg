const express = require("express")
const bodyParser = require('body-parser');
const { serveAdminApi } = require("./admin")
const { serveUserApi } = require("./user")


/////////////
/////////////


const genUserloggAuthApi = (userloggApi, jwtKey) => {
    //Init router
    const router = express.Router()
    router.use(bodyParser.json())
    //Insert userlogg API into request object.
    //As well as JWT key.
    router.use((req, res, next) => {
        req.userlogg = userloggApi
        req.jwtKey = jwtKey
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