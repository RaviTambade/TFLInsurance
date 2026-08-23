const agentRepo=require("../reposetory/agentRepository");

// Get All
exports.getAllAgents=(result)=>{
    agentRepo.getAllAgents(result);
}

exports.getAgentCount=(result)=>{
    agentRepo.getAgentCount(result);
}

exports.registerAgent=(agent,result)=>{
    agentRepo.registerAgent(agent,result);
}

exports.getAgentById=(id,result)=>{
    agentRepo.getAgentById(id,result);
}

exports.updateAgent=(id,agent,result)=>{
    agentRepo.updateAgent(id,agent,result);
}

exports.deleteAgent=(id,result)=>{
    agentRepo.deleteAgent(id,result);
}