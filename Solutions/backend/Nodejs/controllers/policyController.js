const { request, response } = require("express");
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


// Add

exports.addPolicy = (req, res) => {


policyService.addPolicy(

        req.body.PolicyNumber,
        req.body.CustomerId,
        req.body.PolicyType,
        req.body.PolicyAmount,
        req.body.IsRenewed,

        (err, data) => {

            if (err)
                return res.send(err);

            res.send({
                message: "Policy Added Successfully"
            });

            if (data) {
                emitter.emit("policyAddedd", {
                    policyId: data.insertId,
                    data
                });
            }

        });

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