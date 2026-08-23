const notificationRepo = require("../reposetory/notificationRepository");

exports.getNotifications = (callback) => {
    notificationRepo.getNotifications(callback);
};

exports.markAllAsRead = (callback) => {
    notificationRepo.markAllAsRead(callback);
};