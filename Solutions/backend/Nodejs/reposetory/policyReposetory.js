var connection = require("../config/db");

exports.getAllPolicies=(result)=>{
    var sql = "select * from policies";
    connection.query(sql, result);
    // console.log("hello 3");
};


// Get Policy By Id
exports.getPolicyById = (id, result) => {
    connection.query(
        "SELECT * FROM policies WHERE PolicyId=?",
        [id],
        result
    );
};

exports.getPolicyByCustomerId = (id, result) => {
    connection.query(
        "SELECT * FROM policies WHERE CustomerId=?",
        [id],
        result
    );
};

exports.getPolicyByNumber = (PolicyNumber, result) => {

    const sql = `
        SELECT *
        FROM policies
        WHERE PolicyNumber = ?
    `;

    connection.query(
        sql,
        [PolicyNumber],
        result
    );

};
//above function getPolicyByNumber is used to get policy by policy number

exports.renewPolicy = (PolicyNumber, result) => {

    const sql = `
        UPDATE policies
        SET IsRenewed = 1
        WHERE PolicyNumber = ?
    `;

    connection.query(
        sql,
        [PolicyNumber],
        result
    );

};

//above function getPolicyByNumber is used to get policy by policy number

// Add Policy
exports.addPolicy = (
                        PolicyNumber,
                        CustomerId,
                        PolicyType,
                        PolicyAmount,
                        IsRenewed,
                        result
                    ) => {

                        const sql = `
                            INSERT INTO policies
                            (PolicyNumber,CustomerId,PolicyType,PolicyAmount,IsRenewed)
                            VALUES (?,?,?,?,?)
                        `;

                        connection.query(sql,
                            [
                                PolicyNumber,
                                CustomerId,
                                PolicyType,
                                PolicyAmount,
                                IsRenewed
                            ],
                            result
                        );
                    };


                    // Update Policy

exports.updatePolicy = (
                        id,
                        PolicyType,
                        PolicyAmount,
                        IsRenewed,
                        result
                    ) => {

                        const sql = `
                        UPDATE policies
                        SET PolicyType=?,
                            PolicyAmount=?,
                            IsRenewed=?
                        WHERE PolicyId=?
                        `;

                        connection.query(sql,
                            [
                                PolicyType,
                                PolicyAmount,
                                IsRenewed,
                                id
                            ],
                            result
                        );

                    };


                    // Delete Policy

exports.deletePolicy = (id, result) => {

                connection.query(
                            "DELETE FROM policies WHERE PolicyId=?",
                            [id],
                            result
                        );

                    };




exports.getPolicyCount = (result) => {

    const sql = "SELECT COUNT(*) AS count FROM policies";

    connection.query(sql, (err, rows) => {
         console.log(rows);
         
        if (err) {
            return result(err, null);
        }

        result(null, rows[0]);
    });

};
