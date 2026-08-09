

const customerRepo = require("../reposetory/customerRepository");

// Get All
exports.getAllCustomers = (result) => {
    customerRepo.getAllCustomers(result);
};

// Get By Id
exports.getCustomerById = (id, result) => {
    customerRepo.getCustomerById(id, result);
};

// Add
exports.registerCustomer = (customer, result) => {

    customerRepo.registerCustomer(customer, result);

};

// Update
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

    customerRepo.updateCustomer(
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
    );

};

// Delete
exports.deleteCustomer = (id, result) => {
    customerRepo.deleteCustomer(id, result);
};


exports.getCustomerCount = (result) => {

    customerRepo.getCustomerCount(result);

};















