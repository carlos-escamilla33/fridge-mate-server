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