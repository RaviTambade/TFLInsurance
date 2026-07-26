var connection = require("../config/db");


exports.authenticate = (Username, Password, result) => {

    const sql =
        "SELECT * FROM users WHERE Username=? AND Password=?";

    connection.query(
        sql,
        [Username, Password],
        result
    );
};
