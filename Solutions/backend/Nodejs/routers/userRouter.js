const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const { verifyToken, authorize } = require("../middlewares/authMiddleware");



router.get('/getAllUsers',controller.getAllUsers);

router.get("/count", controller.getUserCount);

router.put("/resetPassword/:id",verifyToken,authorize("Admin"),controller.resetPassword);

router.delete("/:id", controller.deleteUser);

router.put("/updateRole/:id",verifyToken,authorize("Admin"),controller.updateRole);

module.exports = router;