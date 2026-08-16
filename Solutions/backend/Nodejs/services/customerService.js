

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
exports.updateCustomer = (customer, result) => {

    const userId = customer.UserId || customer.userId || customer.id;
    customerRepo.updateCustomer(userId,customer,result);

};

// Delete
exports.deleteCustomer = (id, result) => {
    customerRepo.deleteCustomer(id, result);
};


exports.getCustomerCount = (result) => {

    customerRepo.getCustomerCount(result);

};















