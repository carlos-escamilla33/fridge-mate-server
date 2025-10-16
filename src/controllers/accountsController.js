const {createProfile, findProfileByName} = require("../database/models/profileModel");

const registerProfile = async (req, res, next) => {
    // const {id} = req.user;
    // const {first_name, last_name} = req.body;
    try {
        const {id} = req.user;
        const {first_name, last_name} = req.body;
        if (!first_name || !last_name) {
            return res.sendStatus(400);
        }
        
        const _profile = await findProfileByName(id, first_name, last_name);

        if (_profile) {
            return res.sendStatus(400);
        }

        const profile = await createProfile(id, first_name, last_name);
        
        return res.send({
            message: "Profile successfully created!",
            profile,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    registerProfile
}