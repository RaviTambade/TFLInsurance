

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
exports.addCustomer = (
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
    result
) => {

    const sql = `
                        INSERT INTO customers
                        (
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
                            NomineeContactNumber
                        )
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                        `;

    connection.query(
        sql,
        [
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
            NomineeContactNumber
        ],
        result
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

