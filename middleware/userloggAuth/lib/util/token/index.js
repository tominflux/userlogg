const jwt = require('jsonwebtoken')


/////////////
/////////////


const genAbstractAuthToken = async (abstractItem, jwtKey) => {
    //Generate token.
    const token = await jwt.sign(
        { identifier: abstractItem.identifier.data },
        //process.env.JWT_KEY
        jwtKey
    )
    //Return token
    return token
}


/////////////
/////////////


const genAdminAuthToken = async (username, jwtKey, userloggApi) => {
    //Read admin item.
    const admin = await userloggApi.readAdmin(username)
    //Generate token
    const token = await genAbstractAuthToken(admin, jwtKey)
    //Update admin in userlogg.
    await userloggApi.updateAdmin(
        username,
        null,
        token
    )
    //Return token
    return token
}

const genUserAuthToken = async (username, jwtKey, userloggApi) => {
    //Read user item.
    const user = await userloggApi.readAdmin(username)
    //Generate token.
    const token = await genAbstractAuthToken(user, jwtKey)
    //Update user in userlogg.
    await userloggApi.updateUser(
        username,
        null,
        token,
        null
    )
    //Return token
    return token
}


/////////////
/////////////


exports.genAdminAuthToken = genAdminAuthToken
exports.genUserAuthToken = genUserAuthToken