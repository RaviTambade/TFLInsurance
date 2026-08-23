const connection = require("../config/db");

exports.getAllAgents = (result) => {
    connection.query("SELECT * FROM agents", (err, res) => {
        if (err) {
            console.error("Error fetching agents:", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

exports.getAgentCount = (result) => {
    const sql = "SELECT COUNT(*) AS count FROM agents";
    connection.query(sql, (err, rows) => {
        if (err) {
            console.error("Error fetching agent count:", err);
            result(err, null);
        } else {
            result(null, rows[0].count);
        }
    });
}

exports.registerAgent = (agent, callback) => {
    const userSql = `INSERT INTO users(Username,password,Role,IsActive)VALUES(?,?,'Agent',0)`;
   connection.query( userSql,
            [
                agent.email,
                agent.password
            ],
            (err, userResult) => {

            if (err) {
                return callback(err);
            }

            const userId = userResult.insertId;

            // Generate Agent Code
            const agentCode = "AGENT" + (1000 + userId);

   const agentSql = `INSERT INTO agents(
                userId,
                agentCode,
                FullName,
                Email,
                MobileNumber,
                LicenseNumber,
                Branch,
                Designation,
                CommissionRate,
                TotalCommissionEarned,
                DateOfJoining,
                IsActive
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,NOW(),0)`;

            connection.query(
                agentSql,
                [
                    userId,
                    agentCode,
                    agent.fullName,
                    agent.email,
                    agent.mobileNumber,
                    agent.licenseNumber,
                    agent.branch,
                    agent.designation,
                    agent.commissionRate,
                    agent.totalCommissionEarned
                ],
                (err, result) => {

                    if (err) {
                        return callback(err);
                    }
                    //Notification logic added

                    const notificationSql = `
                            INSERT INTO notifications
                            (SourceUserId, Title, Message, Type, IsRead)
                            VALUES (?, ?, ?, ?, 0)
                        `;

                        connection.query(
                            notificationSql,
                            [
                                userId,
                                "New Agent Registered",
                                `${agent.fullName} has been registered as an Agent.`,
                                "Agent"
                            ],
                            (err,Result) => {

                                if (err) {
                                    return callback(err);
                                }

                    callback(null, result);

                                            }
                                         );

                        }
                    );
                })
            }


exports.getAgentById = (id, result) => {
    const sql = "SELECT * FROM agents WHERE AgentId = ?";
    connection.query(sql, [id], (err, res) => {
        if (err) {
            console.error("Error fetching agent by ID:", err);
            result(err, null);
        } else {
            result(null, res[0]);
        }
    });
}

exports.updateAgent = (id, agent, result) => {
    const sql = "UPDATE agents SET name = ?, email = ?, phone = ? WHERE AgentId = ?";
    connection.query(sql, [agent.name, agent.email, agent.phone, id], (err, res) => {
        if (err) {
            console.error("Error updating agent:", err);
            result(err, null);
        } else {
            result(null, { id, ...agent });
        }
    });
}

exports.deleteAgent = (id, result) => {
    const sql = "DELETE FROM agents WHERE AgentId = ?";
    connection.query(sql, [id], (err, res) => {
        if (err) {
            console.error("Error deleting agent:", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}