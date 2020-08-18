const jwt = require("jsonwebtoken")


/////////////////
/////////////////


const authUser = async (req, res, next) => {
    //Get token from request.
    const token = (
        req
        .header("Authorization")
        .replace("Bearer ", "")
    )
    //Verify token.
    const data = await jwt.verify(
        token,
        req.jwtKey
    )
    //
    try {
        //Extract username from token verification
        const username = data.identifier
        //Lookup user.
        const user = await req.userlogg.readUser(username)
        //Function to ensure request token exists for user.
        const checkTokenMatch = () => {
            for (const serverToken of user.properties.tokens.data) {
                if (token === serverToken) {
                    return true
                }
            }
            return false
        }
        //Whether or not user lookup returned a user.
        const userExists = (user !== null)
        if (!userExists) {
            //If not, throw error.
            throw new Error(
                `User "${username}" does not exist.`
            )
        }
        //Ensure user has request token.
        if (!checkTokenMatch()) {
            //If not, throw error.
            throw new Error(
                `User "${username}" is not logged in."`
            )
        }
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