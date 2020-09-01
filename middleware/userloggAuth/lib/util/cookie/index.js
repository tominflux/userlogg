
const SESSION_SHELF_LIFE = 1000 * 60 * 60 * 24 * 7

const adminCookieName = "xaid"
const userCookieName = "xuid"
const cookieOptions = {
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: (process.env.NODE_ENV === "production") ? true : false,
    maxAge: SESSION_SHELF_LIFE,
    path: "/"
}

exports.adminCookieName = adminCookieName
exports.userCookieName = userCookieName
exports.cookieOptions = cookieOptions