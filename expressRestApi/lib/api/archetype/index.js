

const getArchetype = async (req, res, next) => { 
    const archetype = await req.userlogg.readArchetype()
    //
    res.json(archetype)
}

const putArchetype = async (req, res, next) => {
    const newProperties = req.body.newProperties
    //
    await req.userlogg.updateArchetype(newProperties)
    //
    res.send()
}


///////////
///////////


const serveArchetypeApi = (router) => {
    router.get("/userlog/archetype", getArchetype)
    router.put("/userlog/archetype", putArchetype)
}

exports.serveArchetypeApi = serveArchetypeApi