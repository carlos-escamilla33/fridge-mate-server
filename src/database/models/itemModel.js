const {pool} = require("../config/database");

const createItem = async (account_id, profile_id, recipe_id, food_name, expiration_date, ripeness_level) => {
    try {
        const {rows: [item]} = await pool.query(
            `
            INSERT INTO item(account_id, profile_id, recipe_id, food_name, expiration_date, ripeness_level)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
            `,
            [account_id, profile_id, recipe_id, food_name, expiration_date, ripeness_level]
        );

        return item;
    } catch (err) {
        throw err;
    }
}

const findItemById = async (account_id, item_id) => {
    try {
        const {rows: [item]} = await pool.query(
            `
            SELECT * FROM item
            WHERE account_id=$1
            AND item_id=$2;
            `,
            [account_id, item_id]
        );

        return item;
    } catch (err) {
        throw err;
    }
} 

const findItemsByAccountId = async (account_id) => {
    try {
        const {rows} = await pool.query(
            `
            SELECT * FROM item
            WHERE account_id=$1
            `,
            [account_id]
        );

        return rows;
    } catch (err) {
        throw err;
    }
}

const findItemsByProfileId = async (id) => {
    try {
        const {rows} = await pool.query(
            `
            SELECT * FROM item
            WHERE profile_id=$1;
            `,
            [id]
        );

        return rows;
    } catch (err) {
        throw err;
    }
}

const findSoonExpiringItems = async (account_id) => {
    try {
        const {rows} = await pool.query(
            `
            SELECT * FROM item
            WHERE account_id=$1
            AND expiration_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '3 days'
            AND expiration_date >= CURRENT_DATE;
            `,
            [account_id]
        );

        return rows;
    } catch (err) {
        throw err;
    }
}

const findExpiredItems = async (account_id) => {
    try {
        const {rows} = await pool.query(
            `
            SELECT * FROM item
            WHERE account_id=$1
            AND expiration_date < CURRENT_DATE;
            `,
            [account_id]
        )

        return rows;
    } catch (err) {
        throw err;
    }
}

const updateItem = async (account_id, profile_id, item_id, food_name, expiration_date, ripeness_level) => {
    try {
        const {rows:[item]} = await pool.query(
            `
            UPDATE item
            SET food_name=$1, expiration_date=$2, ripeness_level=$3, updated_at= NOW()
            WHERE account_id=$4
            AND item_id=$5
            AND profile_id=$6
            RETURNING *;
            `,
            [food_name, expiration_date, ripeness_level, account_id, item_id, profile_id]
        );

        return item;
    } catch (err) {
        throw err;
    }
}

const updateItemRipeness = async ({item_id, ripeness}) => {
    try {
        const {rows: [item]} = await pool.query(
            `
            UPDATE item
            SET ripeness_level=$1
            WHERE item_id=$2
            RETURNING *;
            `,
            [ripeness, item_id]
        );

        return item;
    } catch (err) {
        throw err;
    }
}

const deleteItem = async (id) => {
    try {
        const {rows: [item]} = await pool.query(
            `
            DELETE FROM item
            WHERE item_id=$1
            RETURNING *;
            `
        );

        return item;
    } catch (err) {
        throw err;
    }
}

const deleteExpiredItems = async (account_id) => {
    try {
        const {rows} = await pool.query(
            `
            DELETE FROM item
            WHERE account_id=$1
            AND expiration_date < CURRENT_DATE
            RETURNING *;
            `,
            [account_id]
        );

        return rows;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createItem,
    findItemById,
    findItemsByAccountId,
    findItemsByProfileId,
    findSoonExpiringItems,
    findExpiredItems,
    updateItem,
    updateItemRipeness,
    deleteItem,
    deleteExpiredItems,
}