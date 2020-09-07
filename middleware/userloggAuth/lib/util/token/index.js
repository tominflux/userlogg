const jwt = require('jsonwebtoken')
const {
    adminCookieName,
    userCookieName
} = require("../cookie")


/////////////
/////////////


const genAbstractAuthToken = async (abstractItem, jwtKey, shelfLife=7) => {
    //Calcualte when it expires.
    const now = Date.now()
    const day = 1000 * 60 * 60 * 24
    const expires = now + shelfLife * day
    //Generate token.
    const token = await jwt.sign(
        { 
            identifier: abstractItem.identifier.data,
            expires
        },
        //process.env.JWT_KEY
        jwtKey
    )
    //Return token
    return token
}

const checkAbstractToken = async (
    req, 
    readEntity, 
    entityName,
    //cookieName
) => {
    //Get token from request.
    const authHeader = req.header('Authorization')
    const token = authHeader.replace("Bearer ", "")
    console.log(token)
    //const token = req.signedCookies[cookieName]
    //Verify token.
    const data = await jwt.verify(
        token,
        req.jwtKey
    )
    //Extract username from token verification
    const username = data.identifier
    //Lookup entity.
    const entity = await readEntity(username)
    //Function to ensure request token exists for entity.
    const checkTokenMatch = () => {
        for (const serverToken of entity.properties.tokens.data) {
            if (token === serverToken) {
                return true
            }
        }
        return false
    }
    //Whether or not entity lookup returned a entity.
    const entityExists = (entity !== null)
    if (!entityExists) {
        //If not, throw error.
        throw new Error(
            `${entityName} "${username}" does not exist.`
        )
    }
    //Ensure entity has request token.
    if (!checkTokenMatch()) {
        //If not, throw error.
        throw new Error(
            `${entityName} "${username}" is not logged in."`
        )
    }
    //Ensure token hasn't expired.
    if (Date.now() > data.expires) {
        throw new Error(
            "Token has expired."
        )
    }
    //
    return { entity, token }
}


/////////////
/////////////


const genAdminAuthToken = async (username, jwtKey, userloggApi, shelfLife=7) => {
    //Read admin item.
    const admin = await userloggApi.readAdmin(username)
    //Generate token
    const token = await genAbstractAuthToken(admin, jwtKey, shelfLife)
    //Update admin's tokens.
    const existingTokens = admin.properties.tokens.data
    const updatedTokens = [
        ...existingTokens,
        token
    ]
    await userloggApi.updateAdmin(
        username,
        null,
        updatedTokens
    )
    //Return token
    return token
}

const genUserAuthToken = async (username, jwtKey, userloggApi, shelfLife=7) => {
    //Read user item.
    const user = await userloggApi.readAdmin(username)
    //Generate token.
    const token = await genAbstractAuthToken(user, jwtKey, shelfLife)
    //Update user's tokens.
    const existingTokens = user.properties.tokens.data
    const updatedTokens = [
        ...existingTokens,
        token
    ]
    await userloggApi.updateUser(
        username,
        null,
        updatedTokens,
        null
    )
    //Return token
    return token
}

const checkAdminToken = async (req) => {
    const { entity, token } = await checkAbstractToken(
        req,
        req.userlogg.readAdmin,
        "Admin",
        adminCookieName
    )
    const admin = entity
    return { admin, token }
}

const checkUserToken = async (req) => {
    const { entity, token } =  await checkAbstractToken(
        req,
        req.userlogg.readUser,
        "User",
        userCookieName
    )
    const user = entity
    return { user, token }
}


/////////////
/////////////


exports.genAdminAuthToken = genAdminAuthToken
exports.genUserAuthToken = genUserAuthToken
exports.checkAdminToken = checkAdminToken
exports.checkUserToken = checkUserToken