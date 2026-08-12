const db = require("./db");

const saveLog = ({
    level,
    action,
    message,
    userId = null,
    customerId = null,
    policyId = null,
    transactionId = null,
    method = null,
    endpoint = null,
    statusCode = null,
    ipAddress = null
}) => {

    const sql = `
        INSERT INTO application_logs
        (
            Level,
            Action,
            Message,
            UserId,
            CustomerId,
            PolicyId,
            TransactionId,
            Method,
            Endpoint,
            StatusCode,
            IpAddress
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        level,
        action,
        message,
        userId,
        customerId,
        policyId,
        transactionId,
        method,
        endpoint,
        statusCode,
        ipAddress
    ];

    db.query(sql, values, (error) => {

        if (error) {
            console.error(
                "Failed to save log:",
                error.message
            );
        }

    });
};

module.exports = saveLog;