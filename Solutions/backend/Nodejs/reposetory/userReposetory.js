var connection = require("../config/db");

exports.getAllUsers=(result)=>{
    var sql = "select * from users";
    connection.query(sql, result);
    // console.log("hello 3");
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

exports.resetPassword = (id, newPassword, callback) => {

    connection.query(
        "UPDATE users SET Password = ? WHERE UserId = ?",
        [newPassword, id],
        callback
    );

};


// Delete User
exports.deleteUser = (id, result) => {

    connection.query(
        "DELETE FROM users WHERE UserId=?",
        [id],
        result
    );

};
