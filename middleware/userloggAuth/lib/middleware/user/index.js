const { checkUserToken } = require("../../util/token")


/////////////////
/////////////////


const authUser = async (req, res, next) => {
    try {
        const { user, token } = await checkUserToken(req)
        //Store user and token in request.
        //(Signifies that user is successfully logged in.)
        req.user = user
        req.token = token
        //Move on to next middleware / request handler.
        next()
    } 
    //
    catch (err) {
        //Report error as HTTP response.
        res.status(401).send({
            error: `Unauthorised.`,
            reason: err.message
        })
    }
}


/////////////////
/////////////////


exports.authUser = authUser