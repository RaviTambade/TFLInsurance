/*
====================================================================
    TFL INSURANCE - CLAIMS MODULE
    Stored Procedures
====================================================================

    Table:
        claims

    Purpose:
        Contains all stored procedures required for the Claims module.

    Operations:
        1. Get all claims
        2. Get claim by ID
        3. Get customer's claims
        4. Create/submit a claim
        5. Update claim information
        6. Change claim status
        7. Approve claim
        8. Reject claim

====================================================================
*/


/*
====================================================================
    1. GET ALL CLAIMS
====================================================================

    Procedure:
        sp_claim_get_all

    Description:
        Returns all claims from the claims table.

    Usage:
        CALL sp_claim_get_all();

====================================================================
*/

DROP PROCEDURE IF EXISTS sp_claim_get_all;

DELIMITER $$

CREATE PROCEDURE sp_claim_get_all()
BEGIN

    SELECT
        ClaimId,
        PolicyNumber,
        CustomerId,
        ClaimDate,
        ClaimType,
        Reason,
        ClaimAmount,
        ApprovedAmount,
        Status,
        Remarks,
        SettlementDate
    FROM claims
    ORDER BY ClaimDate DESC;

END$$

DELIMITER ;


/*
====================================================================
    2. GET CLAIM BY ID
====================================================================

    Procedure:
        sp_claim_get_by_id

    Description:
        Returns a single claim using ClaimId.

    Parameter:
        p_ClaimId - Claim identifier

    Usage:
        CALL sp_claim_get_by_id(1);

====================================================================
*/

DROP PROCEDURE IF EXISTS sp_claim_get_by_id;

DELIMITER $$

CREATE PROCEDURE sp_claim_get_by_id
(
    IN p_ClaimId INT
)
BEGIN

    SELECT
        ClaimId,
        PolicyNumber,
        CustomerId,
        ClaimDate,
        ClaimType,
        Reason,
        ClaimAmount,
        ApprovedAmount,
        Status,
        Remarks,
        SettlementDate
    FROM claims
    WHERE ClaimId = p_ClaimId;

END$$

DELIMITER ;


/*
====================================================================
    3. GET CUSTOMER CLAIMS
====================================================================

    Procedure:
        sp_claim_get_by_customer

    Description:
        Returns all claims belonging to a particular customer.

    Parameter:
        p_CustomerId - Customer identifier

    Usage:
        CALL sp_claim_get_by_customer(101);

====================================================================
*/

DROP PROCEDURE IF EXISTS sp_claim_get_by_customer;

DELIMITER $$

CREATE PROCEDURE sp_claim_get_by_customer
(
    IN p_CustomerId INT
)
BEGIN

    SELECT
        ClaimId,
        PolicyNumber,
        CustomerId,
        ClaimDate,
        ClaimType,
        Reason,
        ClaimAmount,
        ApprovedAmount,
        Status,
        Remarks,
        SettlementDate
    FROM claims
    WHERE CustomerId = p_CustomerId
    ORDER BY ClaimDate DESC;

END$$

DELIMITER ;


/*
====================================================================
    4. CREATE / SUBMIT CLAIM
====================================================================

    Procedure:
        sp_claim_save

    Description:
        Creates a new claim.

        Newly submitted claims are assigned the status:
            Submitted

    Parameters:
        p_PolicyNumber
        p_CustomerId
        p_ClaimDate
        p_ClaimType
        p_Reason
        p_ClaimAmount

    Usage:
        CALL sp_claim_save(
            'POL10001',
            101,
            '2026-08-09 10:00:00',
            'Motor',
            'Accident damage',
            50000.00
        );

====================================================================
*/

DROP PROCEDURE IF EXISTS sp_claim_save;

DELIMITER $$

CREATE PROCEDURE sp_claim_save
(
    IN p_PolicyNumber VARCHAR(100),
    IN p_CustomerId INT,
    IN p_ClaimDate DATETIME,
    IN p_ClaimType VARCHAR(100),
    IN p_Reason TEXT,
    IN p_ClaimAmount DECIMAL(18,2)
)
BEGIN

    INSERT INTO claims
    (
        PolicyNumber,
        CustomerId,
        ClaimDate,
        ClaimType,
        Reason,
        ClaimAmount,
        Status
    )
    VALUES
    (
        p_PolicyNumber,
        p_CustomerId,
        p_ClaimDate,
        p_ClaimType,
        p_Reason,
        p_ClaimAmount,
        'Submitted'
    );

    /*
        Return the newly created ClaimId.
        This can be captured by the repository.
    */
    SELECT LAST_INSERT_ID();

END$$

DELIMITER ;


/*
====================================================================
    5. UPDATE CLAIM
====================================================================

    Procedure:
        sp_claim_update

    Description:
        Updates claim information.

        The following fields can be updated:
            - ClaimType
            - Reason
            - ClaimAmount
            - Remarks

        Claim status is NOT changed here.
        Status should be handled through the status/approval/rejection
        operations.

    Parameters:
        p_ClaimId
        p_ClaimType
        p_Reason
        p_ClaimAmount
        p_Remarks

    Usage:
        CALL sp_claim_update(
            1,
            'Motor Accident',
            'Updated accident details',
            55000.00,
            'Additional information provided'
        );

====================================================================
*/

DROP PROCEDURE IF EXISTS sp_claim_update;

DELIMITER $$

CREATE PROCEDURE sp_claim_update
(
    IN p_ClaimId INT,
    IN p_ClaimType VARCHAR(100),
    IN p_Reason TEXT,
    IN p_ClaimAmount DECIMAL(18,2),
    IN p_Remarks TEXT
)
BEGIN

    UPDATE claims
    SET
        ClaimType = p_ClaimType,
        Reason = p_Reason,
        ClaimAmount = p_ClaimAmount,
        Remarks = p_Remarks
    WHERE ClaimId = p_ClaimId;

END$$

DELIMITER ;


/*
====================================================================
    6. CHANGE CLAIM STATUS
====================================================================

    Procedure:
        sp_claim_change_status

    Description:
        Changes the status of a claim.

        Example statuses:
            Submitted
            UnderReview
            Approved
            Rejected
            Settled

    Parameters:
        p_ClaimId
        p_Status
        p_Remarks

    Usage:
        CALL sp_claim_change_status(
            1,
            'UnderReview',
            'Claim is under review'
        );

====================================================================
*/

DROP PROCEDURE IF EXISTS sp_claim_change_status;

DELIMITER $$

CREATE PROCEDURE sp_claim_change_status
(
    IN p_ClaimId INT,
    IN p_Status VARCHAR(50),
    IN p_Remarks TEXT
)
BEGIN

    UPDATE claims
    SET
        Status = p_Status,
        Remarks = p_Remarks
    WHERE ClaimId = p_ClaimId;

END$$

DELIMITER ;


/*
====================================================================
    7. APPROVE CLAIM
====================================================================

    Procedure:
        sp_claim_approve

    Description:
        Approves a claim and stores the approved amount.

        Status is automatically changed to:
            Approved

    Parameters:
        p_ClaimId
        p_ApprovedAmount
        p_Remarks

    Usage:
        CALL sp_claim_approve(
            1,
            45000.00,
            'Claim approved after verification'
        );

====================================================================
*/

DROP PROCEDURE IF EXISTS sp_claim_approve;

DELIMITER $$

CREATE PROCEDURE sp_claim_approve
(
    IN p_ClaimId INT,
    IN p_ApprovedAmount DECIMAL(18,2),
    IN p_Remarks TEXT
)
BEGIN

    UPDATE claims
    SET
        ApprovedAmount = p_ApprovedAmount,
        Status = 'Approved',
        Remarks = p_Remarks
    WHERE ClaimId = p_ClaimId;

END$$

DELIMITER ;


/*
====================================================================
    8. REJECT CLAIM
====================================================================

    Procedure:
        sp_claim_reject

    Description:
        Rejects a claim.

        Status is automatically changed to:
            Rejected

        ApprovedAmount is cleared because the claim has been rejected.

    Parameters:
        p_ClaimId
        p_Remarks

    Usage:
        CALL sp_claim_reject(
            1,
            'Required documents were not provided'
        );

====================================================================
*/

DROP PROCEDURE IF EXISTS sp_claim_reject;

DELIMITER $$

CREATE PROCEDURE sp_claim_reject
(
    IN p_ClaimId INT,
    IN p_Remarks TEXT
)
BEGIN

    UPDATE claims
    SET
        Status = 'Rejected',
        ApprovedAmount = NULL,
        Remarks = p_Remarks
    WHERE ClaimId = p_ClaimId;

END$$

DELIMITER ;


/*
====================================================================
    END OF CLAIMS STORED PROCEDURES
====================================================================
*/