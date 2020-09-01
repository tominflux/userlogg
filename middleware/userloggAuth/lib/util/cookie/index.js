
const SESSION_SHELF_LIFE = 1000 * 60 * 60 * 24 * 7

const adminCookieName = "xaid"
const userCookieName = "xuid"
const cookieOptions = {
    httpOnly: true,
    sameSite: false,
    signed: true,
    secure: true,
    maxAge: SESSION_SHELF_LIFE,
    path: "/"
}

exports.adminCookieName = adminCookieName
exports.userCookieName = userCookieName
exports.cookieOptions = cookieOptions