const express = require('express');
const router = express.Router();
const controller = require("../controllers/customerController");



router.get("/getAllCustomers", controller.getAllCustomers);

router.get("/count", controller.getCustomerCount);

router.post('/addCustomer',controller.addCustomer);

router.get("/:id", controller.getCustomerById);

router.put("/:id", controller.updateCustomer);

router.delete("/:id", controller.deleteCustomer);



module.exports = router;