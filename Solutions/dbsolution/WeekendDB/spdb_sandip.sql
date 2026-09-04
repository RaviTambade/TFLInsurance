DELIMITER $$

DROP PROCEDURE IF EXISTS USP_POLICY_CREATE$$
CREATE PROCEDURE USP_POLICY_CREATE
(
    IN p_PolicyNumber VARCHAR(30),
    IN p_CustomerId INT,
    IN p_AgentId INT,
    IN p_EmployeeId INT,
    IN p_PolicyType VARCHAR(50),
    IN p_PolicyAmount DECIMAL(15,2)
)
BEGIN
    INSERT INTO policies
    (
        PolicyNumber,
        CustomerId,
        AgentId,
        EmployeeId,
        PolicyType,
        PolicyAmount,
        IsRenewed
    )
    VALUES
    (
        p_PolicyNumber,
        p_CustomerId,
        p_AgentId,
        p_EmployeeId,
        p_PolicyType,
        p_PolicyAmount,
        0
    );

    SELECT
        PolicyId,
        PolicyNumber,
        CustomerId,
        AgentId,
        EmployeeId,
        PolicyType,
        PolicyAmount,
        IsRenewed
    FROM policies
    WHERE PolicyId = LAST_INSERT_ID();
END$$


DROP PROCEDURE IF EXISTS USP_POLICY_GET_BY_ID$$
CREATE PROCEDURE USP_POLICY_GET_BY_ID
(
    IN p_PolicyId INT
)
BEGIN
    SELECT
        PolicyId,
        PolicyNumber,
        CustomerId,
        AgentId,
        EmployeeId,
        PolicyType,
        PolicyAmount,
        IsRenewed
    FROM policies
    WHERE PolicyId = p_PolicyId;
END$$


DROP PROCEDURE IF EXISTS USP_POLICY_GET_ALL$$
CREATE PROCEDURE USP_POLICY_GET_ALL()
BEGIN
    SELECT
        PolicyId,
        PolicyNumber,
        CustomerId,
        AgentId,
        EmployeeId,
        PolicyType,
        PolicyAmount,
        IsRenewed
    FROM policies
    ORDER BY PolicyId DESC;
END$$


DROP PROCEDURE IF EXISTS USP_POLICY_GET_BY_CUSTOMER_ID$$
CREATE PROCEDURE USP_POLICY_GET_BY_CUSTOMER_ID
(
    IN p_CustomerId INT
)
BEGIN
    SELECT
        PolicyId,
        PolicyNumber,
        CustomerId,
        AgentId,
        EmployeeId,
        PolicyType,
        PolicyAmount,
        IsRenewed
    FROM policies
    WHERE CustomerId = p_CustomerId
    ORDER BY PolicyId DESC;
END$$


DROP PROCEDURE IF EXISTS USP_POLICY_GET_BY_AGENT_ID$$
CREATE PROCEDURE USP_POLICY_GET_BY_AGENT_ID
(
    IN p_AgentId INT
)
BEGIN
    SELECT
        PolicyId,
        PolicyNumber,
        CustomerId,
        AgentId,
        EmployeeId,
        PolicyType,
        PolicyAmount,
        IsRenewed
    FROM policies
    WHERE AgentId = p_AgentId
    ORDER BY PolicyId DESC;
END$$


DROP PROCEDURE IF EXISTS USP_POLICY_UPDATE$$
CREATE PROCEDURE USP_POLICY_UPDATE
(
    IN p_PolicyId INT,
    IN p_CustomerId INT,
    IN p_AgentId INT,
    IN p_EmployeeId INT,
    IN p_PolicyType VARCHAR(50),
    IN p_PolicyAmount DECIMAL(15,2)
)
BEGIN
    UPDATE policies
    SET
        CustomerId = p_CustomerId,
        AgentId = p_AgentId,
        EmployeeId = p_EmployeeId,
        PolicyType = p_PolicyType,
        PolicyAmount = p_PolicyAmount
    WHERE PolicyId = p_PolicyId;

    SELECT
        PolicyId,
        PolicyNumber,
        CustomerId,
        AgentId,
        EmployeeId,
        PolicyType,
        PolicyAmount,
        IsRenewed
    FROM policies
    WHERE PolicyId = p_PolicyId;
END$$


DROP PROCEDURE IF EXISTS USP_POLICY_RENEW$$
CREATE PROCEDURE USP_POLICY_RENEW
(
    IN p_PolicyId INT
)
BEGIN
    UPDATE policies
    SET IsRenewed = 1
    WHERE PolicyId = p_PolicyId;

    SELECT
        PolicyId,
        PolicyNumber,
        CustomerId,
        AgentId,
        EmployeeId,
        PolicyType,
        PolicyAmount,
        IsRenewed
    FROM policies
    WHERE PolicyId = p_PolicyId;
END$$

DELIMITER ;