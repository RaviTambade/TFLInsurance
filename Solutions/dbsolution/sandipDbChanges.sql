-- -----------------------------------

-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: saturdaytflinsurancedb
-- Author Name : Sandip 
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer_policies`
--

DROP TABLE IF EXISTS `customer_policies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_policies` (
  `customer_policy_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `policy_id` int NOT NULL,
  `purchase_date` datetime DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'Active' COMMENT 'Active, Inactive, Expired, Cancelled, Pending',
  `premium_amount` decimal(15,2) NOT NULL,
  `payment_frequency` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Monthly, Quarterly, Semi-Annually, Annually',
  `last_payment_date` datetime DEFAULT NULL,
  `next_payment_due_date` datetime DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) DEFAULT '1',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_policy_id`),
  UNIQUE KEY `uq_customer_policy` (`customer_id`,`policy_id`),
  KEY `idx_customer_id` (`customer_id`),
  KEY `idx_policy_id` (`policy_id`),
  KEY `idx_status` (`status`),
  KEY `idx_is_active` (`is_active`),
  KEY `idx_purchase_date` (`purchase_date`),
  KEY `idx_expiry_date` (`expiry_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_policies`
--

LOCK TABLES `customer_policies` WRITE;
/*!40000 ALTER TABLE `customer_policies` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_policies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'saturdaytflinsurancedb'
--
/*!50003 DROP PROCEDURE IF EXISTS `TEST_PROCEDURE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `TEST_PROCEDURE`()
BEGIN
    SELECT 'Procedure Created Successfully' AS Message;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_CUSTOMER_POLICY_DELETE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_CUSTOMER_POLICY_DELETE`(
    IN p_customer_policy_id INT
)
BEGIN

    DECLARE v_error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN

        GET DIAGNOSTICS CONDITION 1
            v_error_message = MESSAGE_TEXT;

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = v_error_message;

    END;


    -- Validate input
    IF p_customer_policy_id IS NULL
       OR p_customer_policy_id <= 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Customer Policy ID cannot be null or zero';

    END IF;


    -- Check if customer policy exists
    IF NOT EXISTS
    (
        SELECT 1
        FROM customer_policies
        WHERE customer_policy_id = p_customer_policy_id
    ) THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Customer policy does not exist';

    END IF;


    -- Delete the record
    DELETE FROM customer_policies
    WHERE customer_policy_id = p_customer_policy_id;


    -- Return affected rows
    SELECT ROW_COUNT() AS affected_rows;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_CUSTOMER_POLICY_GET_ALL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_CUSTOMER_POLICY_GET_ALL`()
BEGIN
	SELECT 
		customer_policy_id AS CustomerPolicyId,
		customer_id AS CustomerId,
		policy_id AS PolicyId,
		purchase_date AS PurchaseDate,
		expiry_date AS ExpiryDate,
		status AS Status,
		premium_amount AS PremiumAmount,
		payment_frequency AS PaymentFrequency,
		last_payment_date AS LastPaymentDate,
		next_payment_due_date AS NextPaymentDueDate,
		remarks AS Remarks,
		is_active AS IsActive,
		created_date AS CreatedDate,
		modified_date AS ModifiedDate
	FROM customer_policies
	ORDER BY created_date DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_CUSTOMER_POLICY_GET_BY_CUSTOMER_AND_STATUS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_CUSTOMER_POLICY_GET_BY_CUSTOMER_AND_STATUS`(
    IN p_customer_id INT,
    IN p_status VARCHAR(50)
)
BEGIN

    DECLARE v_error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN

        GET DIAGNOSTICS CONDITION 1
            v_error_message = MESSAGE_TEXT;

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = v_error_message;

    END;


    -- Validate Customer ID
    IF p_customer_id IS NULL
       OR p_customer_id <= 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Customer ID cannot be null or zero';

    END IF;


    -- Validate Status
    IF p_status IS NULL
       OR p_status = '' THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Status cannot be null or empty';

    END IF;


    -- Check if customer exists
    IF NOT EXISTS
    (
        SELECT 1
        FROM customers
        WHERE customer_id = p_customer_id
    ) THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Customer does not exist';

    END IF;


    -- Get Customer Policies by Status
    SELECT
        customer_policy_id AS CustomerPolicyId,
        customer_id AS CustomerId,
        policy_id AS PolicyId,
        purchase_date AS PurchaseDate,
        expiry_date AS ExpiryDate,
        status AS Status,
        premium_amount AS PremiumAmount,
        payment_frequency AS PaymentFrequency,
        last_payment_date AS LastPaymentDate,
        next_payment_due_date AS NextPaymentDueDate,
        remarks AS Remarks,
        is_active AS IsActive,
        created_date AS CreatedDate,
        modified_date AS ModifiedDate

    FROM customer_policies

    WHERE customer_id = p_customer_id
      AND status = p_status

    ORDER BY created_date DESC;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_CUSTOMER_POLICY_GET_BY_CUSTOMER_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_CUSTOMER_POLICY_GET_BY_CUSTOMER_ID`(
    IN p_customer_id INT
)
BEGIN

    DECLARE v_error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN

        GET DIAGNOSTICS CONDITION 1
            v_error_message = MESSAGE_TEXT;

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = v_error_message;

    END;


    -- Validate Customer ID
    IF p_customer_id IS NULL
       OR p_customer_id <= 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Customer ID cannot be null or zero';

    END IF;


    -- Check if customer exists
    IF NOT EXISTS
    (
        SELECT 1
        FROM customers
        WHERE customer_id = p_customer_id
    ) THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Customer does not exist';

    END IF;


    -- Get Customer Policies
    SELECT
        customer_policy_id AS CustomerPolicyId,
        customer_id AS CustomerId,
        policy_id AS PolicyId,
        purchase_date AS PurchaseDate,
        expiry_date AS ExpiryDate,
        status AS Status,
        premium_amount AS PremiumAmount,
        payment_frequency AS PaymentFrequency,
        last_payment_date AS LastPaymentDate,
        next_payment_due_date AS NextPaymentDueDate,
        remarks AS Remarks,
        is_active AS IsActive,
        created_date AS CreatedDate,
        modified_date AS ModifiedDate

    FROM customer_policies

    WHERE customer_id = p_customer_id

    ORDER BY created_date DESC;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_CUSTOMER_POLICY_GET_BY_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_CUSTOMER_POLICY_GET_BY_ID`(
    IN p_customer_policy_id INT
)
BEGIN

    DECLARE v_error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN

        GET DIAGNOSTICS CONDITION 1
            v_error_message = MESSAGE_TEXT;

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = v_error_message;

    END;


    -- Validate input

    IF p_customer_policy_id IS NULL
       OR p_customer_policy_id <= 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Customer Policy ID cannot be null or zero';

    END IF;


    -- Get Customer Policy

    SELECT
        customer_policy_id AS CustomerPolicyId,
        customer_id AS CustomerId,
        policy_id AS PolicyId,
        purchase_date AS PurchaseDate,
        expiry_date AS ExpiryDate,
        status AS Status,
        premium_amount AS PremiumAmount,
        payment_frequency AS PaymentFrequency,
        last_payment_date AS LastPaymentDate,
        next_payment_due_date AS NextPaymentDueDate,
        remarks AS Remarks,
        is_active AS IsActive,
        created_date AS CreatedDate,
        modified_date AS ModifiedDate

    FROM customer_policies

    WHERE customer_policy_id = p_customer_policy_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_CUSTOMER_POLICY_RENEW` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_CUSTOMER_POLICY_RENEW`(
    IN p_customer_policy_id INT,
    IN p_renewal_period_in_months INT
)
BEGIN

    DECLARE v_error_message VARCHAR(255);
    DECLARE v_new_expiry_date DATETIME;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN

        GET DIAGNOSTICS CONDITION 1
            v_error_message = MESSAGE_TEXT;

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = v_error_message;

    END;


    -- Validate Customer Policy ID
    IF p_customer_policy_id IS NULL
       OR p_customer_policy_id <= 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Customer Policy ID cannot be null or zero';

    END IF;


    -- Validate Renewal Period
    IF p_renewal_period_in_months IS NULL
       OR p_renewal_period_in_months <= 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Renewal period in months must be greater than zero';

    END IF;


    -- Check Customer Policy Exists
    IF NOT EXISTS
    (
        SELECT 1
        FROM customer_policies
        WHERE customer_policy_id = p_customer_policy_id
    ) THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Customer policy does not exist';

    END IF;


    -- Calculate New Expiry Date
    SET v_new_expiry_date =
        DATE_ADD(
            NOW(),
            INTERVAL p_renewal_period_in_months MONTH
        );


    -- Update Policy
    UPDATE customer_policies
    SET
        status = 'Active',
        expiry_date = v_new_expiry_date,
        is_active = TRUE,
        modified_date = NOW()
    WHERE customer_policy_id = p_customer_policy_id;


    -- Return Updated Policy
    SELECT
        customer_policy_id AS CustomerPolicyId,
        customer_id AS CustomerId,
        policy_id AS PolicyId,
        purchase_date AS PurchaseDate,
        expiry_date AS ExpiryDate,
        status AS Status,
        premium_amount AS PremiumAmount,
        payment_frequency AS PaymentFrequency,
        last_payment_date AS LastPaymentDate,
        next_payment_due_date AS NextPaymentDueDate,
        remarks AS Remarks,
        is_active AS IsActive,
        created_date AS CreatedDate,
        modified_date AS ModifiedDate

    FROM customer_policies

    WHERE customer_policy_id = p_customer_policy_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_CUSTOMER_POLICY_SAVE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_CUSTOMER_POLICY_SAVE`(
    IN p_customer_id INT,
    IN p_policy_id INT,
    IN p_purchase_date DATETIME,
    IN p_expiry_date DATETIME,
    IN p_status VARCHAR(50),
    IN p_premium_amount DECIMAL(15,2),
    IN p_payment_frequency VARCHAR(50),
    IN p_last_payment_date DATETIME,
    IN p_next_payment_due_date DATETIME,
    IN p_remarks TEXT,
    IN p_is_active BOOLEAN,
    IN p_created_date DATETIME
)
BEGIN

    IF p_customer_id IS NULL OR p_customer_id <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Customer ID cannot be null or zero';
    END IF;

    IF p_policy_id IS NULL OR p_policy_id <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Policy ID cannot be null or zero';
    END IF;

    IF p_premium_amount IS NULL OR p_premium_amount < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Premium amount cannot be null or negative';
    END IF;

    IF NOT EXISTS
    (
        SELECT 1
        FROM customers
        WHERE customer_id = p_customer_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Customer does not exist';
    END IF;

    IF NOT EXISTS
    (
        SELECT 1
        FROM policies
        WHERE policy_id = p_policy_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Policy does not exist';
    END IF;

    IF EXISTS
    (
        SELECT 1
        FROM customer_policies
        WHERE customer_id = p_customer_id
        AND policy_id = p_policy_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Customer policy combination already exists';
    END IF;

    INSERT INTO customer_policies
    (
        customer_id,
        policy_id,
        purchase_date,
        expiry_date,
        status,
        premium_amount,
        payment_frequency,
        last_payment_date,
        next_payment_due_date,
        remarks,
        is_active,
        created_date
    )
    VALUES
    (
        p_customer_id,
        p_policy_id,
        p_purchase_date,
        p_expiry_date,
        COALESCE(p_status, 'Active'),
        p_premium_amount,
        p_payment_frequency,
        p_last_payment_date,
        p_next_payment_due_date,
        p_remarks,
        COALESCE(p_is_active, TRUE),
        COALESCE(p_created_date, NOW())
    );

    SELECT ROW_COUNT() AS affected_rows;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_CUSTOMER_POLICY_UPDATE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_CUSTOMER_POLICY_UPDATE`(
    IN p_customer_policy_id INT,
    IN p_customer_id INT,
    IN p_policy_id INT,
    IN p_purchase_date DATETIME,
    IN p_expiry_date DATETIME,
    IN p_status VARCHAR(50),
    IN p_premium_amount DECIMAL(15,2),
    IN p_payment_frequency VARCHAR(50),
    IN p_last_payment_date DATETIME,
    IN p_next_payment_due_date DATETIME,
    IN p_remarks TEXT,
    IN p_is_active BOOLEAN,
    IN p_modified_date DATETIME
)
BEGIN

    DECLARE v_error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            v_error_message = MESSAGE_TEXT;

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = v_error_message;
    END;


    -- Validate Customer Policy ID
    IF p_customer_policy_id IS NULL
       OR p_customer_policy_id <= 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Customer Policy ID cannot be null or zero';

    END IF;


    -- Validate Customer ID
    IF p_customer_id IS NULL
       OR p_customer_id <= 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Customer ID cannot be null or zero';

    END IF;


    -- Validate Policy ID
    IF p_policy_id IS NULL
       OR p_policy_id <= 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Policy ID cannot be null or zero';

    END IF;


    -- Validate Premium Amount
    IF p_premium_amount IS NULL
       OR p_premium_amount < 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Premium amount cannot be null or negative';

    END IF;


    -- Check Customer Policy Exists
    IF NOT EXISTS
    (
        SELECT 1
        FROM customer_policies
        WHERE customer_policy_id = p_customer_policy_id
    ) THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Customer policy does not exist';

    END IF;


    -- Check Customer Exists
    IF NOT EXISTS
    (
        SELECT 1
        FROM customers
        WHERE customer_id = p_customer_id
    ) THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Customer does not exist';

    END IF;


    -- Check Policy Exists
    IF NOT EXISTS
    (
        SELECT 1
        FROM policies
        WHERE policy_id = p_policy_id
    ) THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
            'Policy does not exist';

    END IF;


    -- Update Customer Policy
    UPDATE customer_policies
    SET
        customer_id = p_customer_id,
        policy_id = p_policy_id,
        purchase_date = p_purchase_date,
        expiry_date = p_expiry_date,
        status = COALESCE(p_status, status),
        premium_amount = p_premium_amount,
        payment_frequency = p_payment_frequency,
        last_payment_date = p_last_payment_date,
        next_payment_due_date = p_next_payment_due_date,
        remarks = p_remarks,
        is_active = COALESCE(p_is_active, is_active),
        modified_date = COALESCE(p_modified_date, NOW())
    WHERE customer_policy_id = p_customer_policy_id;


    -- Return affected rows
    SELECT ROW_COUNT() AS affected_rows;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_POLICY_CREATE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_POLICY_CREATE`(
    IN p_PolicyNumber VARCHAR(30),
    IN p_CustomerId INT,
    IN p_AgentId INT,
    IN p_EmployeeId INT,
    IN p_PolicyType VARCHAR(50),
    IN p_PolicyAmount DECIMAL(15,2),
    IN p_IsRenewed BIT
)
BEGIN

    DECLARE v_PolicyId INT;

    -- Validate Policy Number
    IF p_PolicyNumber IS NULL
       OR TRIM(p_PolicyNumber) = '' THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Policy Number cannot be null or empty';

    END IF;


    -- Validate Customer
    IF p_CustomerId IS NULL
       OR p_CustomerId <= 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Customer ID cannot be null or zero';

    END IF;


    -- Validate Policy Type
    IF p_PolicyType IS NULL
       OR TRIM(p_PolicyType) = '' THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Policy Type cannot be null or empty';

    END IF;


    -- Validate Policy Amount
    IF p_PolicyAmount IS NULL
       OR p_PolicyAmount < 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Policy Amount cannot be null or negative';

    END IF;


    -- Check duplicate Policy Number
    IF EXISTS
    (
        SELECT 1
        FROM policies
        WHERE PolicyNumber = p_PolicyNumber
    ) THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Policy Number already exists';

    END IF;


    -- Insert Policy
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
        COALESCE(p_IsRenewed, 0)
    );


    SET v_PolicyId = LAST_INSERT_ID();


    -- Return Created Policy ID
    SELECT v_PolicyId AS PolicyId;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_POLICY_DELETE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_POLICY_DELETE`(
    IN p_PolicyId INT
)
BEGIN

    DELETE
    FROM policies
    WHERE PolicyId = p_PolicyId;

    SELECT ROW_COUNT() AS RowsAffected;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_POLICY_GET_ALL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_POLICY_GET_ALL`()
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_POLICY_GET_BY_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_POLICY_GET_BY_ID`(
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_POLICY_SAVE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_POLICY_SAVE`(
    IN p_PolicyId INT,
    IN p_PolicyNumber VARCHAR(30),
    IN p_CustomerId INT,
    IN p_AgentId INT,
    IN p_EmployeeId INT,
    IN p_PolicyType VARCHAR(50),
    IN p_PolicyAmount DECIMAL(15,2),
    IN p_IsRenewed BIT
)
BEGIN

    IF p_PolicyId = 0 THEN

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
            p_IsRenewed
        );

        SELECT LAST_INSERT_ID() AS PolicyId;

    ELSE

        UPDATE policies
        SET
            PolicyNumber = p_PolicyNumber,
            CustomerId = p_CustomerId,
            AgentId = p_AgentId,
            EmployeeId = p_EmployeeId,
            PolicyType = p_PolicyType,
            PolicyAmount = p_PolicyAmount,
            IsRenewed = p_IsRenewed
        WHERE PolicyId = p_PolicyId;

        SELECT p_PolicyId AS PolicyId;

    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `USP_POLICY_UPDATE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `USP_POLICY_UPDATE`(
    IN p_PolicyId INT,
    IN p_PolicyNumber VARCHAR(30),
    IN p_CustomerId INT,
    IN p_AgentId INT,
    IN p_EmployeeId INT,
    IN p_PolicyType VARCHAR(50),
    IN p_PolicyAmount DECIMAL(15,2),
    IN p_IsRenewed BIT
)
BEGIN

    -- Validate Policy ID
    IF p_PolicyId IS NULL
       OR p_PolicyId <= 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Policy ID cannot be null or zero';

    END IF;


    -- Validate Policy Number
    IF p_PolicyNumber IS NULL
       OR TRIM(p_PolicyNumber) = '' THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Policy Number cannot be null or empty';

    END IF;


    -- Validate Customer
    IF p_CustomerId IS NULL
       OR p_CustomerId <= 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Customer ID cannot be null or zero';

    END IF;


    -- Validate Policy Type
    IF p_PolicyType IS NULL
       OR TRIM(p_PolicyType) = '' THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Policy Type cannot be null or empty';

    END IF;


    -- Validate Policy Amount
    IF p_PolicyAmount IS NULL
       OR p_PolicyAmount < 0 THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Policy Amount cannot be null or negative';

    END IF;


    -- Check Policy Exists
    IF NOT EXISTS
    (
        SELECT 1
        FROM policies
        WHERE PolicyId = p_PolicyId
    ) THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Policy does not exist';

    END IF;


    -- Check duplicate Policy Number
    IF EXISTS
    (
        SELECT 1
        FROM policies
        WHERE PolicyNumber = p_PolicyNumber
          AND PolicyId <> p_PolicyId
    ) THEN

        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Policy Number already exists';

    END IF;


    -- Update Policy
    UPDATE policies
    SET
        PolicyNumber = p_PolicyNumber,
        CustomerId = p_CustomerId,
        AgentId = p_AgentId,
        EmployeeId = p_EmployeeId,
        PolicyType = p_PolicyType,
        PolicyAmount = p_PolicyAmount,
        IsRenewed = COALESCE(p_IsRenewed, 0)
    WHERE PolicyId = p_PolicyId;


    -- Return Updated Policy ID
    SELECT p_PolicyId AS PolicyId;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-09 13:28:39

