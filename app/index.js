require('dotenv').config()


//////////
//////////


const genUserloggMongoApi = require("../mongoApi/lib/api")
const genUserloggApi = require("../lib/api")
const genUserloggRestApi = require("../expressRestApi/lib/api")

const userloggMongoApi = genUserloggMongoApi(
    process.env.MONGO_CONNECTION,
    process.env.MONGO_DATABASE
)
const userloggApi = genUserloggApi(userloggMongoApi)
const userloggRestApi = genUserloggRestApi(userloggApi)


//////////
//////////


const express = require('express')

const app = express()
const port = 3000

app.use("/api", userloggRestApi)

app.listen(
    port,
    () => console.log(
        `Userlogg API listening at http://localhost:${port}`
    )
)