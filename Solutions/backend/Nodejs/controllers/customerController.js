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
exports.registerCustomer = (req, res) => {

    customerService.registerCustomer(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            success: true,
            message: "Customer Registered Successfully"
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

    const customer = req.body;
    customer.UserId = req.params.id;
    console.log(req.headers);
    console.log(req.body);

    customerService.updateCustomer(customer, (err, data) => {

            if (err)
                return res.status(500).send(err);

            res.json({
                message: "Changes Saved Successfully"
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