const {findItemsByAccountId, createItem} = require("../database/models/itemModel");

const getAllAccountItems = async (req, res, next) => {
    const accountId = req.user.id;
    try {
        const items = findItemsByAccountId(accountId);

        return res.send({
            items
        });
    } catch (err) {
        next(err);
    }
}

const createSingleItem = async (req, res, next) => {
    const {profileId, recipeId, foodName, expirationDate, ripenessLevel} = req.body;
    const accountId = req.user.id;
    try {
        const item = await createItem(accountId, profileId, recipeId, foodName, expirationDate, ripenessLevel);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllAccountItems,
    createSingleItem,
}