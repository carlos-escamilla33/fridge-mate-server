const {findItemsByAccountId, createItem, findItemById, updateItem} = require("../database/models/itemModel");
const Joi = require("joi");
const itemSchema = Joi.object({
        profileId: Joi.number().integer().positive().required(),
        recipeId: Joi.number().integer().allow(null).optional(),
        foodName: Joi.string().min(2).max(100).required(),
        expirationDate: Joi.date().required(),
        ripenessLevel: Joi.string().min(3).max(30).required()
});

const getAllAccountItems = async (req, res, next) => {
    try {
        const accountId = req.user.id;
        const items = findItemsByAccountId(accountId);

        return res.send({
            items
        });
    } catch (err) {
        next(err);
    }
}

const createSingleItem = async (req, res, next) => {
    try {
        const {error, value} = itemSchema.validate(req.body);
        const accountId = req.user.id;

        if (error) {
            return res.status(400).json({error: error.details});
        }

        const {profileId, recipeId, foodName, expirationDate, ripenessLevel} = value;
        const item = await createItem(accountId, profileId, recipeId, foodName, expirationDate, ripenessLevel);

        if (!item) {
            return res.status(500).json({message: "Error creating item"});
        }

        return res.send({
            message: "item created successfully!",
            item
        });
    } catch (err) {
        next(err);
    }
}

const getSingleItem = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const accountId = req.user.id;
        const item = await findItemById(accountId, itemId);

        if (!item) {
            res.status(404).json({message: "Item not found"});
        }

        return res.send({
            item
        });
    } catch (err) {
        next(err);
    }
}

const updateSingleItem = async (req, res, next) => {
    try {
        const {error, value} = itemSchema.validate(req.body);
        const accountId = req.user.id;
        const itemId = req.params.id;

        if (error) {
            return res.status(400).json({error: error.details});
        }

        const {profileId, foodName, expirationDate, ripenessLevel} = value;
        const item = await updateItem(accountId, profileId, itemId, foodName, expirationDate, ripenessLevel);

        if (!item) {
            res.status(404).json({message: "Error updating item"});
        }

        return res.send({
            message: "Item updated successfully!",
            item
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllAccountItems,
    createSingleItem,
    getSingleItem,
    updateSingleItem,
}