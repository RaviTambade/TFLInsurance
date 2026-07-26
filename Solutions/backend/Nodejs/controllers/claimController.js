const claimService = require("../services/claimService");
const handlers = require("./handler");
const emitter = require("../emitter");

// Get All
exports.getAllClaims = (req, res) => {

    claimService.getAllClaims((err, data) => {

        if (err)
            return res.send(err);

        res.json(data);

    });

};

// Get By Id
exports.getClaimById = (req, res) => {

    claimService.getClaimById(req.params.id, (err, data) => {

        if (err)
            return res.send(err);

        res.json(data);

      if (data) {
                   emitter.emit("claimFetchedById", {
                       PolicyNumber: req.params.id,
                       data
                   });
               }
   
   
           });
   
   };
   
   emitter.on("claimFetchedById", handlers.Emailsend);
   emitter.on("claimFetchedById", handlers.SMSsend);
   

// Add
exports.addClaim = (req, res) => {

    claimService.addClaim(

        req.body.PolicyNumber,
        req.body.CustomerId,
        req.body.ClaimDate,
        req.body.ClaimType,
        req.body.Reason,
        req.body.ClaimAmount,
        req.body.ApprovedAmount,
        req.body.Status,
        req.body.Remarks,
        req.body.SettlementDate,

        (err, data) => {

            if (err)
                return res.send(err);

            res.json({
                message: "Claim Added Successfully"
            });

        if (data) {
                   emitter.emit("claimFetchedById", {
                       PolicyNumber: req.params.id,
                       data
                   });
               }
   
   
           });
   
   };
   
   emitter.on("claimFetchedById", handlers.Emailsend);
   emitter.on("claimFetchedById", handlers.SMSsend);

// Update
exports.updateClaim = (req, res) => {

    claimService.updateClaim(

        req.params.id,
        req.body.ApprovedAmount,
        req.body.Status,
        req.body.Remarks,
        req.body.SettlementDate,

        (err, data) => {

            if (err)
                return res.send(err);

            res.json({
                message: "Claim Updated Successfully"
            });

        });

};

// Delete
exports.deleteClaim = (req, res) => {

    claimService.deleteClaim(

        req.params.id,

        (err, data) => {

            if (err)
                return res.send(err);

            res.json({
                message: "Claim Deleted Successfully"
            });

        });

};