const {pool} = require("../config/database");

const createItem = async ({account_id, profile_id, recipe_id, food_name, expiration_date, ripeness_level}) => {
    try {
        const {rows: [item]} = await pool.query(
            `
            INSERT INTO item(account_id, profile_id, recipe_id, food_name, expiration_date, ripeness_level)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
            `,
            [account_id, profile_id, recipe_id, food_name, expiration_date, purchase_date, ripeness_level]
        );

        return item;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createItem,

}