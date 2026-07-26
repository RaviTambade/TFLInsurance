const claimRepo = require("../reposetory/claimRepo");
const policyRepo = require("../reposetory/policyReposetory");
const customerRepo = require("../reposetory/customerRepository");

exports.getAllClaims = (result) => {
    claimRepo.getAllClaims(result);
};

exports.getClaimById = (id, result) => {
    claimRepo.getClaimById(id, result);
};

exports.addClaim = (

                        PolicyNumber,
                        CustomerId,
                        ClaimDate,
                        ClaimType,
                        Reason,
                        ClaimAmount,
                        ApprovedAmount,
                        Status,
                        Remarks,
                        SettlementDate,
                        result

                    ) => {

    // Check Policy Number Exists

    policyRepo.getPolicyByNumber(PolicyNumber, (err, policyData) => {

        if (err)
            return result(err);

        const policy = Array.isArray(policyData)
            ? policyData[0]
            : policyData;

        if (!policy) {

            return result({
                message: "Policy number " + PolicyNumber + " Not Found"
            });

        }

        if (policy.IsRenewed != 1) {
            return result({
                message: "Policy is not Renewed. Cannot add claim."
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
            



        claimRepo.addClaim(

            PolicyNumber,
            CustomerId,
            ClaimDate,
            ClaimType,
            Reason,
            ClaimAmount,
            ApprovedAmount,
            Status,
            Remarks,
            SettlementDate,
            result

        );

    });

};

exports.updateClaim = (

    id,
    ApprovedAmount,
    Status,
    Remarks,
    SettlementDate,
    result

) => {

    claimRepo.updateClaim(

        id,
        ApprovedAmount,
        Status,
        Remarks,
        SettlementDate,
        result

    );

};

exports.deleteClaim = (id, result) => {

    claimRepo.deleteClaim(id, result);

};