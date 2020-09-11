const express = require("express")
const bodyParser = require('body-parser');
const { serveAdminApi } = require("./admin")
const { serveArchetypeApi } = require("./archetype")
const { serveStatsApi } = require("./stats")
const { serveUserApi } = require("./user")
const { serveUserlogApi } = require("./userlog")


const genUserloggExpressRestApi = (userloggApi) => {
    const router = express.Router()
    router.use(bodyParser.json())
    //Insert userlogg API into router requests
    router.use((req, res, next) => {
        req.userlogg = userloggApi
        next()
    })
    //
    serveAdminApi(router)
    serveArchetypeApi(router)
    serveStatsApi(router)
    serveUserApi(router)
    serveUserlogApi(router)
    //
    return router
}

module.exports = genUserloggExpressRestApi