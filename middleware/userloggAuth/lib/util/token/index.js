const jwt = require('jsonwebtoken')


/////////////
/////////////


const genAbstractAuthToken = (abstractItem, jwtKey) => {
    //Generate token.
    const token = jwt.sign(
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
    const token = genAbstractAuthToken(admin, jwtKey)
    //Update admin in userlogg.
    userloggApi.updateAdmin(
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
    const token = genAbstractAuthToken(user, jwtKey)
    //Update user in userlogg.
    userloggApi.updateUser(
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