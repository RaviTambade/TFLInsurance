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
    IN p_CustomerId INT
)
BEGIN

    DELETE FROM customers
    WHERE CustomerId = p_CustomerId;

END $$

DELIMITER ;
-- -----------------------------------
