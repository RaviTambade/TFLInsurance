const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const { verifyToken, authorize } = require("../middlewares/authMiddleware");



router.get('/getAllUsers',controller.getAllUsers);
 
router.get("/getUser/:id", controller.getUserById);

router.get("/count", controller.getUserCount);

router.get("/customerProfileByUserId/:id", controller.getCustomerProfileByUserId);

router.post("/createUser",verifyToken,authorize("Admin"), controller.createUser);

router.put("/resetPassword/:id",verifyToken,authorize("Admin"),controller.resetPassword);

router.delete("/:id", controller.deleteUser);

router.put("/updateRole/:id",verifyToken,authorize("Admin"),controller.updateRole);

module.exports = router;