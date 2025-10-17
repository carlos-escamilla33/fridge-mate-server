const {findProfilesByAccountId} = require("../database/models/profileModel");


const getAllAccountProfiles = async (req, res, next) => {
    const {id} = req.user;
    try {
        console.log(id);
        const profiles = await findProfilesByAccountId(id);

        return res.send({
            profiles
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllAccountProfiles
}