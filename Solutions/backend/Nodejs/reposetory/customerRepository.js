

const connection = require("../config/db");

// Get All Customers
exports.getAllCustomers = (result) => {
    connection.query("SELECT * FROM customers", result);
};

// Get Customer By Id
exports.getCustomerById = (id, result) => {
    connection.query(
        "SELECT * FROM customers WHERE CustomerId=?",
        [id],
        result
    );
};

// Add Customer
exports.registerCustomer = (customer, callback) => {

    // Step 1 : Insert into Users table

    const userSql = `INSERT INTO users(Username,Password,Role,IsActive)VALUES(?,?,'Customer',1)`;

    connection.query( userSql,
            [
                customer.email,
                customer.password
            ],
            (err, userResult) => {

            if (err) {
                return callback(err);
            }

            const userId = userResult.insertId;

            // Generate Customer Code
            const customerCode = "CUST" + (1000 + userId);

            // Step 2 : Insert into Customer table

            const customerSql = `INSERT INTO customers(
                UserId,
                CustomerCode,
                FirstName,
                LastName,
                DateOfBirth,
                Gender,
                Email,
                MobileNumber,
                AddressLine1,
                AddressLine2,
                City,
                State,
                PostalCode,
                Country,
                PanNumber,
                AadhaarNumber,
                Occupation,
                AnnualIncome,
                NomineeName,
                NomineeRelationship,
                NomineeContactNumber,
                RegistrationDate,
                IsActive,
                TotalPoliciesPurchased
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),1,0)`;

            connection.query(
                customerSql,
                [
                    userId,
                    customerCode,
                    customer.firstName,
                    customer.lastName,
                    customer.dateOfBirth,
                    customer.gender,
                    customer.email,
                    customer.mobileNumber,
                    customer.addressLine1,
                    customer.addressLine2,
                    customer.city,
                    customer.state,
                    customer.postalCode,
                    customer.country,
                    customer.panNumber,
                    customer.aadhaarNumber,
                    customer.occupation,
                    customer.annualIncome,
                    customer.nomineeName,
                    customer.nomineeRelationship,
                    customer.nomineeContactNumber
                ],
                (err, result) => {

                    if (err) {
                        return callback(err);
                    }

                    callback(null, result);

                }
            );

        }
    );

};

// Update Customer
exports.updateCustomer = (
                        id,
                        FirstName,
                        LastName,
                        Email,
                        MobileNumber,
                        AddressLine1,
                        AddressLine2,
                        City,
                        State,
                        PostalCode,
                        Country,
                        result
) => {

    const sql = `
        UPDATE customers
        SET
            FirstName=?,
            LastName=?,
            Email=?,
            MobileNumber=?,
            AddressLine1=?,
            AddressLine2=?,
            City=?,
            State=?,
            PostalCode=?,
            Country=?
        WHERE CustomerId=?
    `;

    connection.query(
        sql,
        [
            FirstName,
            LastName,
            Email,
            MobileNumber,
            AddressLine1,
            AddressLine2,
            City,
            State,
            PostalCode,
            Country,
            id
        ],
        result
    );
       
};

// Delete Customer
exports.deleteCustomer = (id, result) => {

    connection.query(
        "DELETE FROM customers WHERE CustomerId=?",
        [id],
        result
    );

};

exports.getCustomerCount = (result) => {

    const sql = "SELECT COUNT(*) AS count FROM Customers";

    connection.query(sql, (err, rows) => {
         console.log(rows);
         
        if (err) {
            return result(err, null);
        }

        result(null, rows[0]);
    });

};

