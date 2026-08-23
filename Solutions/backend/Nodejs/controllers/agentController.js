const {request, response} = require("express");
const agentService = require("../services/agentService");

exports.getAllAgents = (req, res) => {

    agentService.getAllAgents((err, data) => {

        if (err)
            return res.status(500).send(err);

        res.json(data);

    });

};

exports.getAgentCount = (req, res) => {

    agentService.getAgentCount((err, data) => {
        if (err)
            return res.status(500).send(err);
        res.json({ count: data });
    });
};

exports.registerAgent = (req, res) => {
    agentService.registerAgent(req.body, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(201).json({
            success: true,
            message: "Agent Registered Successfully"
        });
    });
};

exports.getAgentById = (req, res) => {
    agentService.getAgentById(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(data);
    });
};

exports.updateAgent = (req, res) => {
    agentService.updateAgent(req.params.id, req.body, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
};
exports.deleteAgent = (req, res) => {
    agentService.deleteAgent(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
};

