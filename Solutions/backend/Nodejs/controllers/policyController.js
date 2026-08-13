const { request, response } = require("express");
const saveLog = require("../config/dbLogger");
var policyService = require("../services/policyService");

var handlers = require("./handler");
var emitter = require("../emitter");


exports.getAllPolicies=(request,response)=>{
    policyService.getAllPolicies((err,result)=>{
        if(err){
            // console.log("hello1")
            return response.status(500).json(err)
        }
        else{
            response.json(result);
            console.log("Policies fetched .....");
            
        }
    })
}



// Get By Id

exports.getPolicyById = (req, res) => {

    policyService.getPolicyById(
        req.params.id,
        (err, data) => {

            if (err)
                return res.send(err);

            if (data) {
                emitter.emit("policyFetchedById", {
                    policyId: req.params.id,
                    data
                });
            }

            res.send(data);

        });

};

//Get by customerId
exports.getPolicyByCustomerId = (req, res) => {

    policyService.getPolicyByCustomerId(
        req.params.id,
        (err, data) => {

            if (err)
                return res.send(err);

            if (data) {
                emitter.emit("policyFetchedById", {
                    policyId: req.params.id,
                    data
                });
            }

            res.send(data);

        });

};

emitter.on("policyFetchedById", handlers.Emailsend);
emitter.on("policyFetchedById", handlers.SMSsend);


// Add policy

exports.addPolicy = (req, res) => {

    policyService.addPolicy(
                            req.params.id,
                            req.body.PolicyType,
                            req.body.PolicyAmount,
                            req.body.IsRenewed,

        (err, data) => {

            if (err)
                    {

                    return res.status(500).send(err);
                    }

            const policyId = data.insertId;
              //Database Audit Logger
                saveLog({
                        level: "INFO",
                        action: "POLICY_PURCHASE",
                        message: "Policy purchased successfully",
                        customerId: req.params.id,
                        policyId: policyId,
                        method: req.method,
                        endpoint: req.originalUrl,
                        statusCode: 201,
                        ipAddress: req.ip
                        });

                //Emit Policy Event
                emitter.emit("policyAddedd", {policyId: policyId,data: data});
            
               return res.status(201).send({
                                            message:"Policy Added Successfully",
                                            policyId: policyId
                                            });
                                        }
                                    );

};
emitter.on("policyAddedd", handlers.Emailsend);
emitter.on("policyAddedd", handlers.SMSsend);
emitter.on("policyAddedd", handlers.generatePolicyDocument);

// Update

exports.updatePolicy = (req, res) => {

    const {

        PolicyType,
        PolicyAmount,
        IsRenewed

    } = req.body;

    policyService.updatePolicy(

        req.params.id,

        PolicyType,
        PolicyAmount,
        IsRenewed,

        (err, data) => {

            if (err)
                return res.send(err);

            res.send({
                message: "Policy Updated Successfully"
            });
            
            if (data) {
                emitter.emit("policyUpdated", {
                    policyId: req.params.id,
                    data
                });
                console.log("Policy Updated Event Emitted");
            }

        });

};
emitter.on("policyUpdated", handlers.Emailsend);
emitter.on("policyUpdated", handlers.SMSsend);


// Delete

exports.deletePolicy = (req, res) => {

    policyService.deletePolicy(

        req.params.id,

        (err, data) => {

            if (err)
                return res.send(err);

            res.send({
                message: "Policy Deleted Successfully"
            });
           /* res.json({
                policyNumber: req.body.policyNumber,
            });*/

        if (data) {
                emitter.emit("policyDeleted", {
                    policyId: req.params.id,
                    data
                });
                console.log("Policy deleted Event Emitted");
            }

        });

};
emitter.on("policyDeleted", handlers.Emailsend);
emitter.on("policyDeleted", handlers.SMSsend);



exports.renewPolicy = (req, res) => {

    policyService.renewPolicy(

        req.params.PolicyNumber,

        (err, data) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Policy Renewed Successfully"
            });

        }

    );

};


exports.getPolicyCount = (req, res) => {

    policyService.getPolicyCount((err, data) => {

         console.log(data);
        if (err) {
            return res.status(500).json(err);
        }

        res.json(data);

    });

};