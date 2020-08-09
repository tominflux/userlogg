

const postUserlog = async (req, res, next) => {
    await req.userlogg.createUserLog()
    //
    res.send()
}

const getUserlog = async (req, res, next) => {
    const userlog = await req.userlogg.readUserlog()
    //
    res.json(userlog)
}

const deleteUserlog = async (req, res, next) => {
    await req.userlogg.deleteUserlog()
    //
    res.send()
}


//////////
//////////


exports.postUserlog = postUserlog
exports.getUserlog = getUserlog
exports.deleteUserlog = deleteUserlog