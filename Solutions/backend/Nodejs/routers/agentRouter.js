const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");
const { verifyToken } = require("../middlewares/authMiddleware");


router.get("/getAllAgents", agentController.getAllAgents);

router.get("/count", agentController.getAgentCount);

router.post('/register',agentController.registerAgent);

router.get("/:id", agentController.getAgentById);

router.put("/editProfilebyUserId/:id", verifyToken, agentController.updateAgent);

router.delete("/:id", agentController.deleteAgent);



module.exports = router;