const { genMongoApi } = require("@x-logg/util")
const adminMethods = require("./admin")
const archetypeMethods = require("./archetype")
const statsMethods = require("./stats")
const userMethods = require("./user")
const userlogMethods = require("./userlog")

//

const allMethods = {
    ...adminMethods,
    ...archetypeMethods,
    ...statsMethods,
    ...userMethods,
    ...userlogMethods
}

//

const genUserloggMongoApi = (connection, database) => (
    genMongoApi(connection, database, allMethods)
)

module.exports = genUserloggMongoApi