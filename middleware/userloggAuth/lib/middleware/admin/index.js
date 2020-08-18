const jwt = require("jsonwebtoken")


/////////////////
/////////////////


const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization")
        if (!authHeader) {
            throw new Error(
                `No token supplied.`
            )
        }
        //Get token from request.
        const token = authHeader.replace("Bearer ", "")
        //Verify token.
        const data = await jwt.verify(
            token,
            req.jwtKey
        )
        //Extract username from token verification
        const username = data.identifier
        //Lookup admin.
        const admin = await req.userlogg.readAdmin(username)
        //Function to ensure request token exists for admin.
        const checkTokenMatch = () => {
            for (const serverToken of admin.properties.tokens.data) {
                if (token === serverToken) {
                    return true
                }
            }
            return false
        }
        //Whether or not admin lookup returned a admin.
        const adminExists = (admin !== null)
        if (!adminExists) {
            //If not, throw error.
            throw new Error(
                `Admin "${username}" does not exist.`
            )
        }
        //Ensure admin has request token.
        if (!checkTokenMatch()) {
            //If not, throw error.
            throw new Error(
                `Admin "${username}" is not logged in."`
            )
        }
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