<<<<<<< HEAD
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
=======
-- Created  by Shital 09-08-2026

USE saturdaytflinsurancedb;

DELIMITER $$

CREATE PROCEDURE sp_Customer_GetAll()
BEGIN
    SELECT * FROM customers;
END $$

DELIMITER ;
-- --------------------------------------------

USE saturdaytflinsurancedb;

DELIMITER $$

CREATE PROCEDURE sp_Customer_GetById(
    IN p_CustomerId INT
)
BEGIN
    SELECT *
    FROM customers
    WHERE CustomerId = p_CustomerId;
END $$

DELIMITER ;

-- ----------------------------

USE saturdaytflinsurancedb;

DELIMITER $$

CREATE PROCEDURE sp_Customer_Add(
    IN p_UserId INT,
    IN p_CustomerCode VARCHAR(20),
    IN p_FirstName VARCHAR(50),
    IN p_LastName VARCHAR(50),
    IN p_DateOfBirth DATE,
    IN p_Gender VARCHAR(20),
    IN p_Email VARCHAR(100),
    IN p_MobileNumber VARCHAR(15),
    IN p_AddressLine1 VARCHAR(200),
    IN p_AddressLine2 VARCHAR(200),
    IN p_City VARCHAR(100),
    IN p_State VARCHAR(100),
    IN p_PostalCode VARCHAR(20),
    IN p_Country VARCHAR(100),
    IN p_PanNumber VARCHAR(20),
    IN p_AadhaarNumber VARCHAR(20),
    IN p_Occupation VARCHAR(100),
    IN p_AnnualIncome DECIMAL(15,2),
    IN p_NomineeName VARCHAR(100),
    IN p_NomineeRelationship VARCHAR(50),
    IN p_NomineeContactNumber VARCHAR(15)
)
BEGIN

    INSERT INTO customers
    (
        UserId,
        CustomerCode,
        FirstName,
        LastName,
        DateOfBirth,
        Gender,
        Email,
        MobileNumber,
        AddressLine1,
        AddressLine2,
        City,
        State,
        PostalCode,
        Country,
        PanNumber,
        AadhaarNumber,
        Occupation,
        AnnualIncome,
        NomineeName,
        NomineeRelationship,
        NomineeContactNumber
    )
    VALUES
    (
        p_UserId,
        p_CustomerCode,
        p_FirstName,
        p_LastName,
        p_DateOfBirth,
        p_Gender,
        p_Email,
        p_MobileNumber,
        p_AddressLine1,
        p_AddressLine2,
        p_City,
        p_State,
        p_PostalCode,
        p_Country,
        p_PanNumber,
        p_AadhaarNumber,
        p_Occupation,
        p_AnnualIncome,
        p_NomineeName,
        p_NomineeRelationship,
        p_NomineeContactNumber
    );

END $$

DELIMITER ;

-- ------------------------------------

USE saturdaytflinsurancedb;

DELIMITER $$

CREATE PROCEDURE sp_Customer_Update(
    IN p_CustomerId INT,
    IN p_UserId INT,
    IN p_CustomerCode VARCHAR(20),
    IN p_FirstName VARCHAR(50),
    IN p_LastName VARCHAR(50),
    IN p_DateOfBirth DATE,
    IN p_Gender VARCHAR(20),
    IN p_Email VARCHAR(100),
    IN p_MobileNumber VARCHAR(15),
    IN p_AddressLine1 VARCHAR(200),
    IN p_AddressLine2 VARCHAR(200),
    IN p_City VARCHAR(100),
    IN p_State VARCHAR(100),
    IN p_PostalCode VARCHAR(20),
    IN p_Country VARCHAR(100),
    IN p_PanNumber VARCHAR(20),
    IN p_AadhaarNumber VARCHAR(20),
    IN p_Occupation VARCHAR(100),
    IN p_AnnualIncome DECIMAL(15,2),
    IN p_NomineeName VARCHAR(100),
    IN p_NomineeRelationship VARCHAR(50),
    IN p_NomineeContactNumber VARCHAR(15),
    IN p_IsActive TINYINT
)
BEGIN

    UPDATE customers
    SET
        UserId = p_UserId,
        CustomerCode = p_CustomerCode,
        FirstName = p_FirstName,
        LastName = p_LastName,
        DateOfBirth = p_DateOfBirth,
        Gender = p_Gender,
        Email = p_Email,
        MobileNumber = p_MobileNumber,
        AddressLine1 = p_AddressLine1,
        AddressLine2 = p_AddressLine2,
        City = p_City,
        State = p_State,
        PostalCode = p_PostalCode,
        Country = p_Country,
        PanNumber = p_PanNumber,
        AadhaarNumber = p_AadhaarNumber,
        Occupation = p_Occupation,
        AnnualIncome = p_AnnualIncome,
        NomineeName = p_NomineeName,
        NomineeRelationship = p_NomineeRelationship,
        NomineeContactNumber = p_NomineeContactNumber,
        IsActive = p_IsActive
    WHERE CustomerId = p_CustomerId;

END $$

DELIMITER ;

-- ---------------------------------------

USE saturdaytflinsurancedb;

DELIMITER $$

CREATE PROCEDURE sp_Customer_Delete(
>>>>>>> ab69a6d2ec2481f9aaa53357773ece14596eef8b
    IN p_CustomerId INT
)
BEGIN

<<<<<<< HEAD
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
=======
    DELETE FROM customers
    WHERE CustomerId = p_CustomerId;

END $$

DELIMITER ;
-- -----------------------------------
>>>>>>> ab69a6d2ec2481f9aaa53357773ece14596eef8b
