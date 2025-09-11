const pool = require("../config/database");

const createProfile = async ({account_id, first_name, last_name, notifcations_enabled}) => {
    try {
        const {rows: [profile]} = await pool.query(
            `
            INSERT INTO profile(account_id, first_name, last_name, notifications_enabled)
            VALUES($1, $2, $3, $4)
            RETURNING *;
            `,
            [account_id, first_name, last_name, notifcations_enabled]
        );

        return profile;
    } catch (err) {
        throw err;
    }
}

const findProfileById = async (id) => {
    try {
        const {rows: [profile]} = await pool.query(
            `
            SELECT * FROM profile
            WHERE profile_id=$1;
            `,
            [id]
        );

        return profile;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createProfile,
    findProfileById,
    
}