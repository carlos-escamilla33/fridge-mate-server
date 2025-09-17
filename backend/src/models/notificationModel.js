const {pool} = require("../config/database");

const createNotification = async ({profile_id, item_id, notification_type, notificationText, is_read}) => {
    try {
        const {rows: [notification]} = await pool.query(
            `
            INSERT INTO notification(profile_id, item_id, notification_type, notification, is_read)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
            `,
            [profile_id, item_id, notification_type, notificationText, is_read]
        );

        return notification;
    } catch (err) {
        throw err;
    }
}

const findByNotificationsByProfileId = async (profile_id) => {
    try {
        const {rows} = await pool.query(
            `
            SELECT * FROM notification
            WHERE profile_id=$1;
            `,
            [profile_id]
        );

        return rows;
    } catch (err) {
        throw err;
    }
}

const findUnreadNotificationsByProfileId = async (profile_id) => {
    try {
        const {rows} = await pool.query(
            `
            SELECT * FROM notification
            WHERE profile_id=$1
            AND is_read=$2
            `,
            [profile_id, false]
        );

        return rows;
    } catch (err) {
        throw err;
    }
}

const markNotificationAsReadByProfileId = async (notification_id, profile_id) => {
    try {
        const {rows: [notification]} = await pool.query(
            `
            UPDATE notification
            SET is_read=$1
            WHERE notification_id=$2 AND profile_id=$3
            RETURNING *;
            `,
            [true, notification_id, profile_id]
        );

        return notification;
    } catch (err) {
        throw err;
    }
}

const markAllNotificationsAsReadByProfileId = async (profile_id) => {
    try {
        const {rows} = await pool.query(
            `
            UPDATE notification
            SET is_read=$2
            WHERE profile_id AND is_read=$3
            RETURNING *;
            `,
            [profile_id, true, false]
        );

        return rows;
    } catch (err) {
        throw err;
    }
}

const deleteNotificationById = async (notification_id) => {
    try {
        const {rows: [notification]} = await pool.query(
            `
            DELETE FROM notification
            WHERE notification_id=$1
            RETURNING *;
            `,
            [notification_id]
        );

        return notification;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createNotification,
    findByNotificationsByProfileId,
    findUnreadNotificationsByProfileId,
    markNotificationAsReadByProfileId,
    markAllNotificationsAsReadByProfileId,
    deleteNotificationById
}