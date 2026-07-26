var policyRepo=require("../reposetory/policyReposetory");

exports.getAllPolicies=(result)=>{
    // console.log("hello2");
    policyRepo.getAllPolicies(result);
    // console.log("hello2");
}


exports.getPolicyById = (id, result) => {
    policyRepo.getPolicyById(id, result);
};

exports.getPolicyByCustomerId = (id, result) => {
    policyRepo.getPolicyByCustomerId(id, result);
};



exports.addPolicy = (
    PolicyNumber,
    CustomerId,
    PolicyType,
    PolicyAmount,
    IsRenewed,
    result
) => {

    policyRepo.addPolicy(
        PolicyNumber,
        CustomerId,
        PolicyType,
        PolicyAmount,
        IsRenewed,
        result
    );

};

exports.updatePolicy = (id,PolicyType, PolicyAmount,IsRenewed, result) => {

policyRepo.updatePolicy(id,PolicyType,PolicyAmount,IsRenewed, result);

                };

exports.deletePolicy = (id, result) => {
    policyRepo.deletePolicy(id, result);
};



exports.renewPolicy = (PolicyNumber, result) => {

    policyRepo.getPolicyByNumber(PolicyNumber, (err, data) => {

        if (err)
            return result(err);

        if (data.length === 0) {

            return result({
                message: "Policy Not Found"
            });

        }

        const policy = data[0];

        console.log(policy);

        if (policy.IsRenewed == 1) {

            return result({
                message: "Policy Already Renewed"
            });

        }

        policyRepo.renewPolicy(PolicyNumber, result);

    });

};



exports.getPolicyCount = (result) => {

    policyRepo.getPolicyCount(result);

};