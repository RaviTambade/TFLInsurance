const connection = require("../config/db");

// Get All
exports.getAllClaims = (result) => {

    connection.query(
        "SELECT * FROM claims",
        result
    );

};

// Get By Id
exports.getClaimById = (id, result) => {

    connection.query(
        "SELECT * FROM claims WHERE ClaimId=?",
        [id],
        result
    );

};

// Add
exports.addClaim = (
    PolicyNumber,
    CustomerId,
    ClaimDate,
    ClaimType,
    Reason,
    ClaimAmount,
    ApprovedAmount,
    Status,
    Remarks,
    SettlementDate,
    result
) => {

    const sql = `
    INSERT INTO claims
    (
        PolicyNumber,
        CustomerId,
        ClaimDate,
        ClaimType,
        Reason,
        ClaimAmount,
        ApprovedAmount,
        Status,
        Remarks,
        SettlementDate
    )
    VALUES(?,?,?,?,?,?,?,?,?,?)
    `;

    connection.query(
        sql,
        [
            PolicyNumber,
            CustomerId,
            ClaimDate,
            ClaimType,
            Reason,
            ClaimAmount,
            ApprovedAmount,
            Status,
            Remarks,
            SettlementDate
        ],
        result
    );
};

// Update
exports.updateClaim = (
    id,
    ApprovedAmount,
    Status,
    Remarks,
    SettlementDate,
    result
) => {

    const sql = `
    UPDATE claims
    SET
        ApprovedAmount=?,
        Status=?,
        Remarks=?,
        SettlementDate=?
    WHERE ClaimId=?
    `;

    connection.query(
        sql,
        [
            ApprovedAmount,
            Status,
            Remarks,
            SettlementDate,
            id
        ],
        result
    );

};

// Delete
exports.deleteClaim = (id, result) => {

    connection.query(
        "DELETE FROM claims WHERE ClaimId=?",
        [id],
        result
    );

};