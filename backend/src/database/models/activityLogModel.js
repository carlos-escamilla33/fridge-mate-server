const {pool} = require("../config/database");

const createActivityLog = async ({account_id, profile_id, action_type}) => {
    try {   
        const {rows: [activity_log]} = await pool.query(
            `
            INSERT INTO activity_log(account_id, profile_id, action_type)
            VALUES($1, $2, $3)
            RETURNING *;
            `,
            [account_id, profile_id, action_type]
        );

        return activity_log;
    } catch (err) {
        throw err;
    }
}

const findActivityLogsByAccountId = async (account_id) => {
    try {
        const {rows} = await pool.query(
            `
            SELECT * FROM activity_log
            WHERE account_id=$1;
            `,
            [account_id]
        );

        return rows;
    } catch (err) {
        throw err;
    }
}

const findActivityLogsByProfileId = async (profile_id) => {
    try {
        const {rows} = await pool.query(
            `
            SELECT * FROM activity_log
            WHERE profile_id=$1;
            `,
            [profile_id]
        );

        return rows;
    } catch (err) {
        throw err;
    }
}

const findActivityLogsByDateRange = async (account_id, startDate, endDate) => {
    try {
        const {rows} = await pool.query(
            `
            SELECT * FROM activity_log
            WHERE account_id=$1
            AND created_at BETWEEN $2 AND $3
            ORDER BY created_at DESC;
            `,
            [account_id, startDate, endDate]
        );

        return rows;
    } catch (err) {
        throw err;
    }
}

const deleteOldActivityLogs = async (account_id) => {
    try {
        const {rows} = await pool.query(
            `
            DELETE FROM activity_log
            WHERE account_id=$1
            AND created_at <= CURRENT_DATE - INTERVAL '7 days'
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
    createActivityLog,
    findActivityLogsByAccountId,
    findActivityLogsByProfileId,
    findActivityLogsByDateRange,
    deleteOldActivityLogs
}