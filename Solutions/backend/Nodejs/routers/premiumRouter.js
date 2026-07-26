const express = require("express");

const router = express.Router();

const premiumController = require("../controllers/premiumController");

router.get("/", premiumController.getAllPremiums);

router.get("/:id", premiumController.getPremiumById);

router.post("/", premiumController.addPremium);

router.put("/:id", premiumController.updatePremium);

router.delete("/:id", premiumController.deletePremium);

module.exports = router;