const {pool} = require("../config/database");

const createProfile = async (account_id, first_name, last_name) => {
    try {
        const {rows: [profile]} = await pool.query(
            `
            INSERT INTO profile(account_id, first_name, last_name, notifications_enabled)
            VALUES($1, $2, $3, $4)
            RETURNING *;
            `,
            [account_id, first_name, last_name, true]
        );

        return profile;
    } catch (err) {
        throw err;
    }
}

const findProfileByName = async (account_id, first_name, last_name) => {
    try {
        const {rows: [profile]} = await pool.query(
            `
            SELECT * FROM profile
            WHERE account_id=$1
            AND first_name=$2
            AND last_name=$3;
            `,
            [account_id, first_name, last_name]
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

const findProfilesByAccountId = async (account_id) => {
    try {
        const {rows} = await pool.query(
            `
            SELECT * FROM profile
            WHERE account_id=$1;
            `,
            [account_id]
        );

        return rows;
    } catch (err) {
        throw err;
    }
}

const updateProfile = async (profile_id, account_id, first_name, last_name) => {
    try {
        const {rows: [profile]} = await pool.query(
            `
            UPDATE profile
            SET first_name=$1, last_name=$2
            WHERE profile_id=$3
            AND account_id=$4
            RETURNING *;
            `,
            [first_name, last_name, profile_id, account_id]
        );

        return profile;
    } catch (err) {
        throw err;
    }
}

const toggleProfileNotifications = async ({profile_id, isNotificationsEnabled}) => {
    try {
        const {rows: [profile]} = await pool.query(
            `
            UPDATE profile
            SET notifications_enabled=$1
            WHERE profile_id=$2
            RETURNING *;
            `,
            [isNotificationsEnabled, profile_id]
        );

        return profile;
    } catch (err) {
        throw err;
    }
}

const deleteProfile = async (profile_id) => {
    try {
        const {rows: [profile]} = await pool.query(
            `
            DELETE FROM profile
            WHERE profile_id=$1
            RETURNING *;
            `,
            [profile_id]
        )

        return profile;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createProfile,
    findProfileByName,
    findProfileById,
    findProfilesByAccountId,
    updateProfile,
    toggleProfileNotifications,
    deleteProfile,
}