const express = require('express');
const router = express.Router();
const controller = require("../controllers/policyController");



router.get('/getAllPolicies',controller.getAllPolicies);

router.get("/count", controller.getPolicyCount);

router.get("/:id", controller.getPolicyById);

router.get("/getPolicyByCustomerId/:id",controller.getPolicyByCustomerId);

router.post("/", controller.addPolicy);

router.put("/:id", controller.updatePolicy);

router.delete("/:id", controller.deletePolicy);

router.put("/renew/:PolicyNumber", controller.renewPolicy);

module.exports = router;
