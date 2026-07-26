const { request, response } = require("express");
var customerService = require("../services/customerService");

var handlers = require("./handler");
var event = require("events");// inbuilt module
var emitter = new event.EventEmitter();


// Get All
exports.getAllCustomers = (req, res) => {

    customerService.getAllCustomers((err, data) => {

        if (err)
            return res.status(500).send(err);

        res.json(data);

    });

};

// Get By Id
exports.getCustomerById = (req, res) => {

    customerService.getCustomerById(req.params.id, (err, data) => {

        if (err)
            return res.status(500).send(err);

        res.json(data);

    });

};




// Add Customer
exports.addCustomer = (req, res) => {

    customerService.addCustomer(

        req.body.CustomerCode,
        req.body.FirstName,
        req.body.LastName,
        req.body.DateOfBirth,
        req.body.Gender,
        req.body.Email,
        req.body.MobileNumber,
        req.body.AddressLine1,
        req.body.AddressLine2,
        req.body.City,
        req.body.State,
        req.body.PostalCode,
        req.body.Country,
        req.body.PanNumber,
        req.body.AadhaarNumber,
        req.body.Occupation,
        req.body.AnnualIncome,
        req.body.NomineeName,
        req.body.NomineeRelationship,
        req.body.NomineeContactNumber
    ,
    (err, data) => {

        if (err)
            return res.status(500).send(err);

        res.json({
            message: "Customer Added Successfully",
            CustomerId: data.insertId
        });
 });
            
};

           /* if (data) {
                            emitter.emit("customerAdded", {
                                policyId: req.body.PolicyId,
                                data
                            });
                            console.log('Customer Added Event Emitted');
                        }
            
            
                    };
            
            };
            
emitter.on("customerAdded", handlers.Emailsend);
emitter.on("customerAdded", handlers.SMSsend);
//emitter.on("customerAdded", handlers.CustomerAddedDocument);
*/






// Update Customer
exports.updateCustomer = (req, res) => {

    
    console.log(req.headers);
    console.log(req.body);

    customerService.updateCustomer(
        

       req.params.id,
         req.body.FirstName,
        req.body.LastName,
        req.body.Email,
        req.body.MobileNumber,
        req.body.AddressLine1,
        req.body.AddressLine2,
        req.body.City,
        req.body.State,
        req.body.PostalCode,
        req.body.Country,
        

        (err, data) => {

            if (err)
                return res.status(500).send(err);

            res.json({
                message: "Customer Updated Successfully"
            });

            if (data) {
                         emitter.emit("customerUpdated", {
                        policyId: req.body.PolicyId,
                         data
                     });
                    console.log('Customer Updated Event Emitted');
                    }
                    
                    
                    });
                    
                    };
                    
        emitter.on("customerUpdated", handlers.Emailsend);
        emitter.on("customerUpdated", handlers.SMSsend);
        //emitter.on("customerUpdated", handlers.CustomerUpdatedDocument);

// Delete Customer
exports.deleteCustomer = (req, res) => {

    customerService.deleteCustomer(

        req.params.id,

        (err, data) => {

            if (err)
                return res.status(500).send(err);

            res.json({
                message: "Customer Deleted Successfully"
           
           });

        if (data) {
                         emitter.emit("customerUpdated", {
                        policyId: req.body.PolicyId,
                         data
                     });
                    console.log('Customer Updated Event Emitted');
                    }
                    
                    
                    });
                    
                    };
                    
        emitter.on("customerUpdated", handlers.Emailsend);
        emitter.on("customerUpdated", handlers.SMSsend);


 exports.getCustomerCount = (req, res) => {

    customerService.getCustomerCount((err, data) => {

         console.log(data);
        if (err) {
            return res.status(500).json(err);
        }

        res.json(data);

    });

};