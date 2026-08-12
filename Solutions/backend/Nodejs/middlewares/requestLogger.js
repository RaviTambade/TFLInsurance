const logger = require("../config/logger");

const requestLogger = (req, res, next) => {

    const startTime = Date.now();

    res.on("finish", () => {

        const duration =
            Date.now() - startTime;

        logger.info("HTTP Request", {

            method: req.method,

            url: req.originalUrl,

            statusCode: res.statusCode,

            duration: `${duration}ms`,

            ip: req.ip

        });

    });

    next();
};

module.exports = requestLogger;