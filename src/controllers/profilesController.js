const {findProfilesByAccountId, findProfileById, updateProfile, deleteProfile, toggleProfileNotifications} = require("../database/models/profileModel");


const getAllAccountProfiles = async (req, res, next) => {
    const accountId = req.user.id;
    try {
        const profiles = await findProfilesByAccountId(accountId);

        return res.send({
            profiles
        });
    } catch (err) {
        next(err);
    }
}

const getSingleProfile = async (req, res, next) => {
    const {id} = req.params;
    const accountId = req.user.id;
    try {
        const profile = await findProfileById(id);

        if (!profile) {
            return res.status(404).json({message: "Account not found"});
        }

        if (profile.account_id !== accountId) {
            return res.status(403).json({ 
                message: "Access denied - this profile doesn't belong to you" 
            });
        }

        res.send({
            profile
        });
    } catch (err) {
        next(err);
    }
}

const updateProfileName = async (req, res, next) => {
    const profileId = req.params.id;
    const {firstName, lastName} = req.body;
    const accountId = req.user.id;
    try {
        const profile = await updateProfile(profileId, accountId, firstName, lastName);

        if (!profile) {
            return res.status(404).json({message: "Profile not found"});
        }

        return res.send({
            message: "Updated profile successfully",
            profile
        });
    } catch (err) {
        
    }
}

const deleteSingleProfile = async (req, res, next) => {
    const profileId = req.params.id;
    const accountId = req.user.id;
    try {
        const profile = await deleteProfile(accountId, profileId);

        if (!profile) {
            return res.status(404).json({message: "Profile not found"});
        }

        return res.send({
            message: "Profile deleted successfully!"
        });
    } catch (err) {
        next(err);
    }
}

const updateNotifications = async (req, res, next) => {
    const profileId = req.params.id;
    const accountId = req.user.id;
    const {notificationSetting} = req.body;
    try {
        const profile = await toggleProfileNotifications(accountId, profileId, notificationSetting);

        console.log(profile);

        if (!profile) {
            return res.status(404).json({message: "Profile not found"});
        }

        return res.send({
            message: `Profile notifications updated to ${profile.notifications_enabled}!`
        });
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getAllAccountProfiles,
    getSingleProfile,
    updateProfileName,
    deleteSingleProfile,
    updateNotifications,
}