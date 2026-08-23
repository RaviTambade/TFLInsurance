const connection = require("../config/db"); // use your existing connection path

exports.getNotifications = (callback) => {

    const sql = `
        SELECT
            NotificationId,
            SourceUserId,
            Title,
            Message,
            Type,
            IsRead,
            CreatedAt
        FROM notifications
        ORDER BY CreatedAt DESC
    `;

    connection.query(sql, (err, result) => {

        if (err) {
            return callback(err);
        }

        callback(null, result);
    });
};

exports.markAllAsRead = (callback) => {

    const sql = `
        UPDATE notifications
        SET IsRead = 1
        WHERE IsRead = 0
    `;

    connection.query(sql, (err, result) => {

        if (err) {
            return callback(err);
        }

        callback(null, result);
    });
};