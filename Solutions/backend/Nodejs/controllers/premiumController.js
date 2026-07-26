const premiumService = require("../services/premiumService");
var handlers = require("./handler");
var emitter = require("../emitter");

// Get All
exports.getAllPremiums = (req, res) => {

    premiumService.getAllPremiums((err, data) => {

        if (err)
            return res.send(err);

        res.send(data);

    });

};


// Get By Id

exports.getPremiumById = (req, res) => {

    premiumService.getPremiumById(
        req.params.id,
        (err, data) => {

            if (err)
                return res.send(err);

           
            res.send(data);
                if (data) {
                emitter.emit("premiumFetchedById", {
                    policyId: req.params.id,
                    data
                });
            }


        });

};

emitter.on("premiumFetchedById", handlers.Emailsend);
emitter.on("premiumFetchedById", handlers.SMSsend);


// Add

exports.addPremium = (req, res) => {

    premiumService.addPremium(

        req.body.PolicyId,
        req.body.CustomerId,
        req.body.AmountPaid,
        req.body.PaymentDate,
        req.body.PaymentMode,
        req.body.TransactionId,
        req.body.PaymentFrequency,
        req.body.PaymentStatus,
        req.body.Remarks,

        (err, data) => {

            if (err)
                return res.send(err);

            res.send({
                message: "Premium Added Successfully"
            });
                if (data) {
                emitter.emit("premiumPaid", {
                    policyId: req.body.PolicyId,
                    data
                });
                console.log('Premium Paid Event Emitted');
            }


        });

};

emitter.on("premiumPaid", handlers.Emailsend);
emitter.on("premiumPaid", handlers.SMSsend);
emitter.on("premiumPaid", handlers.PremiumPaidDocument);



// Update

exports.updatePremium = (req, res) => {

    premiumService.updatePremium(

        req.params.id,

        req.body.AmountPaid,
        req.body.PaymentMode,
        req.body.PaymentFrequency,
        req.body.PaymentStatus,
        req.body.Remarks,

        (err, data) => {

            if (err)
                return res.send(err);

            res.send({
                message: "Premium Updated Successfully"
            });

            if (data) {
                emitter.emit("premiumUpdate", {
                    policyId: req.body.PolicyId,
                    data
                });
                console.log('Premium Update Event Emitted');
            }


        });

};
        emitter.on("premiumUpdate", handlers.Emailsend);
        emitter.on("premiumUpdate", handlers.SMSsend);

// Delete

exports.deletePremium = (req, res) => {

    premiumService.deletePremium(

        req.params.id,

        (err, data) => {

            if (err)
                return res.send(err);

            res.send({
                message: "Premium Deleted Successfully"
            });
        
            if (data) {
                emitter.emit("premiumDelete", {
                    policyId: req.body.PolicyId,
                    data
                });
                console.log('Premium Delete Event Emitted');
            }


        });

};
        emitter.on("premiumDelete", handlers.Emailsend);
        emitter.on("premiumDelete", handlers.SMSsend);