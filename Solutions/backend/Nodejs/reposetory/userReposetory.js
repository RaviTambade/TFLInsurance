var connection = require("../config/db");

exports.getAllUsers=(result)=>{
    var sql = "select * from users";
    connection.query(sql, result);
    // console.log("hello 3");
};

/*
exports.getUserById = (id, result) => {

    connection.query(
        `SELECT users.UserId, users.Username, users.Role, users.IsActive,
                customers.FirstName, customers.LastName, customers.Email
         FROM users
         LEFT JOIN customers ON users.UserId = customers.UserId
         WHERE users.UserId = ?`,
        [id],
        (err, data) => {
            if (err) {
                return result(err);
            }
            result(null, data);
        }
    );

};*/

exports.getUserById = (id, result) => {

    const userSql = `
        SELECT UserId, Username, Role, IsActive
        FROM users
        WHERE UserId = ?
    `;

    connection.query(userSql, [id], (err, users) => {

        if (err) {
            return result(err);
        }

        if (users.length === 0) {
            return result(null, []);
        }

        const user = users[0];

        if (user.Role === "Agent") {

            const sql = `
                SELECT users.UserId,
                       users.Username,
                       users.Role,
                       users.IsActive,
                       agents.AgentCode,
                       agents.FullName,
                       agents.Email,
                       agents.MobileNumber,
                       agents.Branch,
                       agents.Designation
                FROM users
                INNER JOIN agents
                    ON users.UserId = agents.UserId
                WHERE users.UserId = ?
            `;

            connection.query(sql, [id], result);

        }
        else if (user.Role === "Customer") {

            const sql = `
                SELECT users.UserId,
                       users.Username,
                       users.Role,
                       users.IsActive,
                       customers.FirstName,
                       customers.LastName,
                       customers.Email
                FROM users
                INNER JOIN customers
                    ON users.UserId = customers.UserId
                WHERE users.UserId = ?
            `;

            connection.query(sql, [id], result);

        }

        // Add SalesPerson / AccountPerson here
    });
};

exports.getUserCount = (result) => {

    const sql = "SELECT COUNT(*) AS count FROM users";

    connection.query(sql, (err, rows) => {
         console.log(rows);
         
        if (err) {
            return result(err, null);
        }

        result(null, rows[0]);
    });

};

exports.createUser = (Username, Password, Role ,IsActive, result) => {

    const sql = "INSERT INTO users (Username, Password, Role, IsActive) VALUES (?, ?, ?, ?)";

    connection.query(sql, [Username, Password, Role, IsActive], result);
};

exports.resetPassword = (id, newPassword, callback) => {

    connection.query(
        "UPDATE users SET Password = ? WHERE UserId = ?",
        [newPassword, id],
        callback
    );

};


// Update Role
exports.updateRole = (id, role, result) => {

    const sql = `
        UPDATE users
        SET Role = ?
        WHERE UserId = ?
    `;

    connection.query(sql, [role, id], (err, data) => {

        if (err)
            return result(err);

        result(null, data);

    });

};


// Delete User
exports.deleteUser = (id, result) => {

    connection.query(
        "DELETE FROM users WHERE UserId=?",
        [id],
        result
    );

};


exports.getCustomerProfileByUserId = (id, result) => {

    connection.query(
        `SELECT customers.CustomerId,
                customers.FirstName, 
                customers.LastName, 
                customers.Email,
                customers.NomineeName,
                customers.NomineeRelationship,
                customers.NomineeContactNumber,
                customers.AddressLine1,
                customers.AddressLine2,
                customers.City,
                customers.State,
                customers.PostalCode,
                customers.Country,
                users.IsActive
            FROM users JOIN customers 
            ON users.UserId = customers.UserId 
            WHERE users.UserId = ?;`,
        [id],
        (err, data) => {
            if (err) {
                return result(err);
            }
            result(null, data);
        }
    );
}