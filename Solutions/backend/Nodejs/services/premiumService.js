const premiumRepo = require("../reposetory/premiumRepo");
const policyRepo = require("../reposetory/policyReposetory");
const customerRepo = require("../reposetory/customerRepository");

exports.getAllPremiums = (result) => {
    premiumRepo.getAllPremiums(result);
};

exports.getPremiumById = (id, result) => {
    premiumRepo.getPremiumById(id, result);
};

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
    result) => {

    if (AmountPaid <= 0) {
        return result({
            message: "Premium Amount should be greater than zero."
        });
    }

  
    customerRepo.getCustomerById(CustomerId, (customererr, customerdata) => {
    
            if (customererr)
                return result(customererr);
    
         const customer = Array.isArray(customerdata) ? customerdata[0] : customerdata;

        if (!customer) {
            return result({
                message: "Customer not found. Cannot add premium."
            });

        }
      
            if (customer.IsActive != 1) {
                return result({
                    message: "Customer is not active.Cannot add premium."
                });
            }

        });
    
      
    policyRepo.getPolicyById(PolicyId, (policyErr, policyData) => {
        
        if (policyErr) {
            return result(policyErr);
        }

        const policy = Array.isArray(policyData) ? policyData[0] : policyData;

        if (!policy) {
            return result({
                message: "Policy not found. Cannot add premium."
            });
        }

        /*if (policy.IsRenewed != 1) {
            return result({
                message: "Policy is not active. Cannot add premium."
            });
        }*/

        premiumRepo.addPremium(
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
        );
    });

};


exports.updatePremium = (
    id,
    AmountPaid,
    PaymentMode,
    PaymentFrequency,
    PaymentStatus,
    Remarks,
    result
) => {

    premiumRepo.updatePremium(
        id,
        AmountPaid,
        PaymentMode,
        PaymentFrequency,
        PaymentStatus,
        Remarks,
        result
    );

};

exports.deletePremium = (id, result) => {

    premiumRepo.deletePremium(id, result);

};