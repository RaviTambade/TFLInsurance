const connection = require("../config/db");

// Get All Premiums
exports.getAllPremiums = (result) => {
    connection.query(
        "SELECT * FROM premiums",
        result
    );
};

// Get Premium By Id
exports.getPremiumById = (id, result) => {
    connection.query(
        "SELECT * FROM premiums WHERE PremiumId=?",
        [id],
        result
    );
};

// Add Premium
exports.addPremium = (
                            PolicyId,
                            CustomerId,
                            AmountPaid,
                            PaymentDate,
                            PaymentMode,
                            TransactionId,
                            PaymentFrequency,
                            PaymentStatus,
                            Remarks,
                            result
                        ) => {

                    const sql = `
                        INSERT INTO premiums
                        (
                            PolicyId,
                            CustomerId,
                            AmountPaid,
                            PaymentDate,
                            PaymentMode,
                            TransactionId,
                            PaymentFrequency,
                            PaymentStatus,
                            Remarks
                        )
                        VALUES(?,?,?,?,?,?,?,?,?)
                    `;

    connection.query(sql,
        [
            PolicyId,
            CustomerId,
            AmountPaid,
            PaymentDate,
            PaymentMode,
            TransactionId,
            PaymentFrequency,
            PaymentStatus,
            Remarks
        ],
        result
    );

};


// Update Premium

exports.updatePremium = (
    id,
    AmountPaid,
    PaymentMode,
    PaymentFrequency,
    PaymentStatus,
    Remarks,
    result
) => {

    const sql = `
        UPDATE premiums
        SET
            AmountPaid=?,
            PaymentMode=?,
            PaymentFrequency=?,
            PaymentStatus=?,
            Remarks=?
        WHERE PremiumId=?
    `;

    connection.query(sql,
        [
            AmountPaid,
            PaymentMode,
            PaymentFrequency,
            PaymentStatus,
            Remarks,
            id
        ],
        result
    );

};


// Delete Premium

exports.deletePremium = (id, result) => {

    connection.query(
        "DELETE FROM premiums WHERE PremiumId=?",
        [id],
        result
    );

};