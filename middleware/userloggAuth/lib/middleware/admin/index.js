const { checkAdminToken } = require("../../util/token")


/////////////////
/////////////////


const authAdmin = async (req, res, next) => {
    try {
        const { admin, token } = await checkAdminToken(req)
        //Store admin and token in request.
        //(Signifies that admin is successfully logged in.)
        req.admin = admin
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


exports.authAdmin = authAdmin