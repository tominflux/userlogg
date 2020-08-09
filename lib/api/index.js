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

const wrapApiMethod = (method, dataApi) => {
    return (...params) => method(...params, dataApi)
}

const wrapAllMethods = (objOfMethods, dataApi) => {
    let objOfWrappedMethods = {}
    for (const key in objOfMethods) {
        const method = objOfMethods[key]
        const wrappedMethod = wrapApiMethod(method, dataApi)
        objOfWrappedMethods = {
            ...objOfWrappedMethods,
            [key]: wrappedMethod
        }
    }
    return {...objOfWrappedMethods}
}

//

const genUserloggApi = (dataApi) => {
    const allWrappedMethods = wrapAllMethods(allMethods, dataApi)
    return allWrappedMethods
}

module.exports = genUserloggApi