const adminMethods = require("./admin")
const archetypeMethods = require("./archetype")
const userMethods = require("./user")
const userlogMethods = require("./userlog")

//

const allMethods = {
    ...adminMethods,
    ...archetypeMethods,
    ...userMethods,
    ...userlogMethods
}

//

const { genCoreApi } = require("@x-logg/util")

//

const genUserloggApi = (dataApi) => {
    return genCoreApi(allMethods, dataApi)
}

module.exports = genUserloggApi