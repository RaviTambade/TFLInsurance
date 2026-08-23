const notificationService = require("../services/notificationService");

exports.getNotifications = (req, res) => {

    notificationService.getNotifications((err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch notifications",
                error: err
            });
        }

        res.status(200).json({
            success: true,
            notifications: result
        });
    });
};

exports.markAllAsRead = (req, res) => {

    notificationService.markAllAsRead((err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to mark notifications as read",
                error: err
            });
        }

        res.status(200).json({
            success: true,
            message: "All notifications marked as read"
        });

    });
};


