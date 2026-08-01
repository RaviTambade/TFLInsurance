Create database  SaturdayTFLInsuranceDB;
USE SaturdayTFLInsuranceDB;
--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` enum('Admin','Employee','Agent','Customer') NOT NULL,
  `IsActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@123','Admin',1),(2,'emp1','emp@123','Employee',1),(4,'cust1','cust12345','Agent',1),(5,'rahul.divate@gmail.com','rahul@123','Customer',1),(6,'shiv.shintre@gmail.com','shiv@123','Customer',1),(7,'divyafule@gmail.com','divya@123','Customer',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `CustomerId` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `CustomerCode` varchar(20) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Gender` varchar(20) DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `MobileNumber` varchar(15) NOT NULL,
  `AddressLine1` varchar(200) DEFAULT NULL,
  `AddressLine2` varchar(200) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `State` varchar(100) DEFAULT NULL,
  `PostalCode` varchar(20) DEFAULT NULL,
  `Country` varchar(100) DEFAULT NULL,
  `PanNumber` varchar(20) DEFAULT NULL,
  `AadhaarNumber` varchar(20) DEFAULT NULL,
  `Occupation` varchar(100) DEFAULT NULL,
  `AnnualIncome` decimal(15,2) DEFAULT '0.00',
  `NomineeName` varchar(100) DEFAULT NULL,
  `NomineeRelationship` varchar(50) DEFAULT NULL,
  `NomineeContactNumber` varchar(15) DEFAULT NULL,
  `RegistrationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `IsActive` tinyint(1) DEFAULT '1',
  `TotalPoliciesPurchased` int DEFAULT '0',
  PRIMARY KEY (`CustomerId`),
  UNIQUE KEY `CustomerCode` (`CustomerCode`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `PanNumber` (`PanNumber`),
  UNIQUE KEY `AadhaarNumber` (`AadhaarNumber`),
  KEY `FK_Customer_User` (`UserId`),
  CONSTRAINT `FK_Customer_User` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,NULL,'CUST1001','Ravi','Tambade','1990-05-15','Male','ravi@gmail.com','9876543210',NULL,NULL,'Pune','Maharashtra','411001','India','ABCDE1234F','123412341234','Engineer',1200000.00,'Anita Tambade','Spouse','9876543222','2026-06-18 09:52:34',1,2),(2,NULL,'CUST1002','Amit','Sharma','1988-11-20','Male','amit@gmail.com','9876500000',NULL,NULL,'Mumbai','Maharashtra','400001','India','PQRST5678K','987654321012','Doctor',2000000.00,'Neha Sharma','Spouse','9876501111','2026-06-18 09:52:34',1,1),(3,NULL,'CUST1003','Sneha','Patil','1995-03-10','Female','sneha@gmail.com','9123456780',NULL,NULL,'Nagpur','Maharashtra','440001','India','LMNOP9876Z','567890123456','Teacher',600000.00,'Rahul Patil','Husband','9123400000','2026-06-18 09:52:34',0,3),(21,NULL,'CUST10305','pranita','Naik','2022-05-26','FeMale','pranitanaik@gmail.com','9809874496','Viva sarovar society','Block B-402','Pune','Maharashtra','411046','India','cvmeyj78930','900942066234','engineer',1000000.00,'rahul Divate','brother','8886397988','2026-07-06 19:06:04',1,1),(23,NULL,'CUST10306','Yashoda','Ambildhoke','1990-05-26','FeMale','yashodaambildhoke@gmail.com','9809974496','Viva sarovar society','Block B-402','Pune','Maharashtra','411046','India','cvmeyj75930','900842066234','engineer',1000000.00,'Rajaram Ambildhoke','Husband','8886397988','2026-07-06 19:23:12',1,1),(24,NULL,'CUST10307','rajaram','Ambildhoke','1985-05-26','Male','rajaramambildhoke@gmail.com','9808874496','Viva sarovar society','Block B-402','Pune','Maharashtra','411046','India','cvmeyj70930','900442066234','engineer',1000000.00,'Yashoda Ambildhoke','spouse','8986397988','2026-07-06 19:26:05',1,1),(26,NULL,'CUST1008','Rahul','Divate','1998-05-15','Male','rahul.divate@gmail.com','9876543210','Shivaji Nagar','Near Bus Stand','Pune','Maharashtra','411005','India','ABCDk1234F','123456789012','Software Engineer',750000.00,'Priya Divate','Sister','9876543211','2026-07-13 17:05:00',1,0),(28,NULL,'CUST1010','shiv','patil','1998-05-15','Male','shivp@gmail.com','9876843210','Shivaji Nagar','Near Bus Stand','Pune','Maharashtra','411005','India','ABCDk8234F','128756789012','Software Engineer',750000.00,'Priya patil','Sister','9876543211','2026-07-13 17:07:42',1,0),(29,NULL,'CUST1011','raj','patil','1998-05-15','Male','rajp@gmail.com','9879843210','Shivaji Nagar','Near Bus Stand','Pune','Maharashtra','411005','India','ABCvk8234F','128756789062','Software Engineer',750000.00,'Priya patil','Sister','8876543211','2026-07-13 17:10:42',1,0),(31,NULL,'CUST1012','rina','patil','1998-05-07','Female','rinapatil@gmail.com','8987877676','pune','pune','pune','maharashtra','411046','india','cvmpa2343','123456789013','engineer',2000000.00,'raj patil','Husband','12345634675','2026-07-13 17:14:17',1,0),(33,NULL,'CUST1013','viraj','patil','1998-05-15','Male','virajp@gmail.com','9879843210','Shivaji Nagar','Near Bus Stand','Pune','Maharashtra','411005','India','AvCvk8234F','128756989062','Software Engineer',750000.00,'Priya patil','Sister','8876543211','2026-07-14 16:56:38',1,0),(34,NULL,'CUST1014','nikita','shinde','2002-06-04','Female','nikitashinde@gmail.com','7774866261','pune','pune','pune','maharashtra','411045','india','cvmpl2343','345678901234','civil engineer',4000000.00,'mayuri shinde','sister','1234567890','2026-07-14 17:32:43',1,0),(35,NULL,'CUST1015','sanika','reddy','2008-06-10','Female','sanikaR@gmail.com','1234567890','pune','pune','pune','maharashtra','411045','india','cvnpb1238','123456789056','engineer',4000000.00,'mayuri shinde','sister','12345634675','2026-07-14 18:02:10',1,0),(36,NULL,'CUST1016','mayur','ambildhoke',NULL,NULL,'ambildhokemayur@gmail.com','8987877676','pune','pune','pune','maharashtra','411046','india','cvnnb1234','123456789019','civil engineer',1000000.00,'mayuri shinde','sister','1234563459','2026-07-14 18:32:41',1,0),(37,NULL,'CUST1017','mayu','ambile','2010-06-08','Female','ambildhokemayuri@gmail.com','1234567890','fhn','ghn','pune','maharashtra','411046','india','cvnpb1734','123456789015','engineer',2000000.00,'mayuri shinde','sister','1234563459','2026-07-15 18:10:31',1,0),(41,NULL,'CUST1019','mayu','tikke','2020-10-10','Female','mayutikke@gmail.com','4565434567','pune','pune','pune','maharashtra','411046',NULL,'cvnpb8765','564534438765','engineer',2000000.00,'raj patil','Husband','9876456523','2026-07-16 12:42:47',1,0),(42,NULL,'CUST1020','rina','patil','2004-02-09','Female','rinapatil','6545635465','pune','pune','pune','maharashtra','411046','india',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-07-16 15:57:05',1,0),(43,NULL,'CUST1021','chetak','shele','1999-12-21','Male','chetakshele@gmail.com','7654323456','pune','pune','pune','maharashtra','411045','india','cvmku1234','567654345645','engineer',1000000.00,'raju shele','brother','8765433456','2026-07-16 16:34:41',1,0),(46,NULL,'CUST1022','neha','rane','1990-07-18','Female','neharane@gmail.com','1234567898','pune','pune','pune','maharashtra','411046','india','cvmpa2346','123456789017','engineer',200000.00,'sachin rane','Husband','1234567899','2026-07-17 16:46:18',1,0),(48,NULL,'CUST1023','nita','patil','1996-07-08','Female','nitapatil@gmail.com','8987807679','pune','pune','pune','maharashtra','411046','india','cvnpb1230','123456789016','engineer',1000000.00,'raj patil','Husband','1234563450','2026-07-17 17:16:18',1,0),(49,NULL,'CUST10320','ranjit','shele','1999-02-11','Male','ranjitshele@gmail.com','2343245676','pune',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-07-18 14:53:54',1,0),(50,NULL,'CUST1026','heena','shah','2002-02-19',NULL,'heenas@gmail.com','5678234564','pune','pune','pune','maharashtra','411046','india','cvnpb7652','123456765987','engineer',NULL,NULL,NULL,NULL,'2026-07-19 14:26:22',1,0),(51,NULL,'CUST1027','teera ','sharma','1995-06-13','Female','teeras@gmail.com','11234567899','pune','pune','pune','maharashtra','411046','india','cvnpb3546','345678324345','engineer',500000.00,'niya Sharma','sister','9876456598','2026-07-28 15:43:45',1,0),(52,NULL,'CUST1030','reena','kolte','1999-06-29','Female','reenakolte@gmail.com','8987871111',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'engineer',NULL,NULL,NULL,NULL,'2026-07-29 16:30:51',1,0),(54,6,'CUST1006','shiv','shintre','1998-05-15','Male','shiv.shintre@gmail.com','9874343210','Shivaji Nagar','Near Bus Stand','Pune','Maharashtra','411005','India','ABcfrE1234F','123406789012','Software Engineer',750000.00,'Priya shintre','Sister','9876543431','2026-07-31 18:52:57',1,0),(55,7,'CUST1007','divya','fule','2003-06-10','Female','divyafule@gmail.com','8745324367','pune','viva lake society','pune','maharashtra','411046','india','cvtre1232','675435623451','engineer',2000000.00,'sarthak fule','husband','9765453453','2026-07-31 19:26:15',1,0);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `agents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agents` (
  `AgentId` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `AgentCode` varchar(20) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `MobileNumber` varchar(15) NOT NULL,
  `LicenseNumber` varchar(50) NOT NULL,
  `Branch` varchar(100) DEFAULT NULL,
  `Designation` varchar(50) DEFAULT NULL,
  `CommissionRate` decimal(5,4) DEFAULT '0.0000',
  `TotalCommissionEarned` decimal(15,2) DEFAULT '0.00',
  `DateOfJoining` date NOT NULL,
  `IsActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`AgentId`),
  UNIQUE KEY `AgentCode` (`AgentCode`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `LicenseNumber` (`LicenseNumber`),
  KEY `FK_Agent_User` (`UserId`),
  CONSTRAINT `FK_Agent_User` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agents`
--

LOCK TABLES `agents` WRITE;
/*!40000 ALTER TABLE `agents` DISABLE KEYS */;
INSERT INTO `agents` VALUES (1,4,'AGT1001','Ramesh Sharma','ramesh@gmail.com','9876543210','LIC1001','Pune','Senior Advisor',0.1000,250000.00,'2023-05-15',1),(2,NULL,'AGT1002','Priya Deshmukh','priya@gmail.com','9123456780','LIC1002','Mumbai','Advisor',0.0800,180000.00,'2022-08-10',1),(3,NULL,'AGT1003','Suresh Patil','suresh@gmail.com','9988776655','LIC1003','Nagpur','Manager',0.1200,500000.00,'2021-01-20',1);
/*!40000 ALTER TABLE `agents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `EmployeeId` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `EmployeeCode` varchar(20) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `MobileNumber` varchar(15) NOT NULL,
  `Department` varchar(50) NOT NULL,
  `Designation` varchar(50) NOT NULL,
  `DateOfJoining` date NOT NULL,
  `Salary` decimal(15,2) DEFAULT '0.00',
  `IsActive` tinyint(1) DEFAULT '1',
  `Address` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`EmployeeId`),
  UNIQUE KEY `EmployeeCode` (`EmployeeCode`),
  UNIQUE KEY `Email` (`Email`),
  KEY `FK_Employee_User` (`UserId`),
  CONSTRAINT `FK_Employee_User` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `policies`
--

DROP TABLE IF EXISTS `policies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policies` (
  `PolicyId` int NOT NULL AUTO_INCREMENT,
  `PolicyNumber` varchar(30) NOT NULL,
  `CustomerId` int NOT NULL,
  `AgentId` int DEFAULT NULL,
  `EmployeeId` int DEFAULT NULL,
  `PolicyType` varchar(50) NOT NULL,
  `PolicyAmount` decimal(15,2) NOT NULL,
  `IsRenewed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`PolicyId`),
  UNIQUE KEY `PolicyNumber` (`PolicyNumber`),
  KEY `CustomerId` (`CustomerId`),
  KEY `FK_Policy_Agent` (`AgentId`),
  KEY `FK_Policy_Employee` (`EmployeeId`),
  CONSTRAINT `FK_Policy_Agent` FOREIGN KEY (`AgentId`) REFERENCES `agents` (`AgentId`),
  CONSTRAINT `FK_Policy_Employee` FOREIGN KEY (`EmployeeId`) REFERENCES `employees` (`EmployeeId`),
  CONSTRAINT `policies_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`CustomerId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policies`
--

LOCK TABLES `policies` WRITE;
/*!40000 ALTER TABLE `policies` DISABLE KEYS */;
INSERT INTO `policies` VALUES (2,'POL1002',1,NULL,NULL,'Life',1000000.00,1),(3,'POL1003',2,NULL,NULL,'Motor',300000.00,1),(4,'POL1004',3,NULL,NULL,'Travel',200000.00,1),(5,'POL1005',3,NULL,NULL,'Health',750000.00,1),(11,'POL1006',1,NULL,NULL,'Health',500000.00,1),(12,'POL1007',1,NULL,NULL,'Life',1000000.00,1),(17,'POL-CUST10304',1,NULL,NULL,'Health',500000.00,0),(18,'POL1008',21,NULL,NULL,'Health',500000.00,1),(20,'POL1009',21,NULL,NULL,'Health',500000.00,0),(21,'POL1010',21,NULL,NULL,'Health',500000.00,0),(22,'POL1011',21,NULL,NULL,'term',500000.00,0),(23,'POL1012',21,NULL,NULL,'term',500000.00,0),(26,'POL1013',1,NULL,NULL,'motor',200000.00,0),(28,'POL1014',1,NULL,NULL,'motor',200000.00,0),(30,'POL1015',29,NULL,NULL,'Health',500000.00,0),(34,'POL1016',36,NULL,NULL,'Life',20000.00,0),(48,'POL1017',43,NULL,NULL,'Health',1000000.00,0),(49,'POL1018',43,NULL,NULL,'Life',2000000.00,0),(51,'POL1019',48,NULL,NULL,'Health',1000000.00,0),(52,'POL1020',48,NULL,NULL,'Life',2000000.00,0),(54,'POL1021',48,NULL,NULL,'Vehicle',1000000.00,0),(55,'POL1022',48,NULL,NULL,'Health',32000.00,0),(56,'POL1030',49,NULL,NULL,'Health',2000000.00,0),(57,'POL1031',49,NULL,NULL,'Life',3000000.00,0),(59,'POL1033',50,NULL,NULL,'Life',5000000.00,0),(60,'POL1032',50,NULL,NULL,'Home',3000000.00,0);
/*!40000 ALTER TABLE `policies` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `claims`
--

DROP TABLE IF EXISTS `claims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `claims` (
  `ClaimId` int NOT NULL AUTO_INCREMENT,
  `PolicyNumber` varchar(30) NOT NULL,
  `CustomerId` int NOT NULL,
  `ClaimDate` datetime NOT NULL,
  `ClaimType` varchar(50) NOT NULL,
  `Reason` varchar(500) DEFAULT NULL,
  `ClaimAmount` decimal(15,2) NOT NULL,
  `ApprovedAmount` decimal(15,2) DEFAULT '0.00',
  `Status` varchar(30) DEFAULT 'Registered',
  `Remarks` varchar(500) DEFAULT NULL,
  `SettlementDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ClaimId`),
  KEY `CustomerId` (`CustomerId`),
  CONSTRAINT `claims_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`CustomerId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claims`
--

LOCK TABLES `claims` WRITE;
/*!40000 ALTER TABLE `claims` DISABLE KEYS */;
INSERT INTO `claims` VALUES (1,'POL1001',1,'2026-06-18 09:52:34','Health','Hospitalization due to surgery',50000.00,45000.00,'Approved','Verified documents','2026-06-21 09:52:34'),(3,'POL1005',3,'2026-06-18 09:52:34','Health','Medical emergency',30000.00,30000.00,'Settled','Payment completed','2026-06-18 09:52:34'),(4,'POL1004',3,'2026-07-11 00:00:00','Travel','Hospitalization due to surgery',500000.00,400000.00,'Approved','Verified Documents','2026-07-20 00:00:00');
/*!40000 ALTER TABLE `claims` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `premiums`
--

DROP TABLE IF EXISTS `premiums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `premiums` (
  `PremiumId` int NOT NULL AUTO_INCREMENT,
  `PolicyId` int NOT NULL,
  `CustomerId` int NOT NULL,
  `AmountPaid` decimal(12,2) NOT NULL,
  `PaymentDate` datetime NOT NULL,
  `PaymentMode` varchar(30) NOT NULL,
  `TransactionId` varchar(100) NOT NULL,
  `PaymentFrequency` varchar(20) NOT NULL,
  `PaymentStatus` varchar(20) DEFAULT 'Success',
  `Remarks` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`PremiumId`),
  UNIQUE KEY `TransactionId` (`TransactionId`),
  KEY `PolicyId` (`PolicyId`),
  KEY `CustomerId` (`CustomerId`),
  CONSTRAINT `premiums_ibfk_1` FOREIGN KEY (`PolicyId`) REFERENCES `policies` (`PolicyId`),
  CONSTRAINT `premiums_ibfk_2` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`CustomerId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `premiums`
--

LOCK TABLES `premiums` WRITE;
/*!40000 ALTER TABLE `premiums` DISABLE KEYS */;
INSERT INTO `premiums` VALUES (2,2,1,25000.00,'2026-06-18 09:52:34','Credit Card','TXN10002','Annual','Success','Renewed policy'),(3,3,2,8000.00,'2026-06-18 09:52:34','Net Banking','TXN10003','Quarterly','Success','Installment paid'),(4,4,3,5000.00,'2026-06-18 09:52:34','UPI','TXN10004','Monthly','Pending','Awaiting confirmation'),(5,5,3,15000.00,'2026-06-18 09:52:34','Cash','TXN10005','Annual','Success','Cash payment received'),(7,3,2,12000.00,'2026-06-18 00:00:00','UPI','TXN10010','Annual','Success','Renew Policy'),(8,3,2,12000.00,'2026-06-18 00:00:00','UPI','TXN10013','Annual','Success','Renew Policy'),(9,3,2,12000.00,'2026-06-18 00:00:00','UPI','TXN10014','Annual','Success','Renew Policy'),(10,4,3,13000.00,'2026-06-14 00:00:00','UPI','TXN10015','Annual','Success','Renew Policy'),(12,4,24,13000.00,'2026-06-14 00:00:00','UPI','TXN10016','Annual','Success','Renew Policy'),(13,4,3,8000.00,'2026-07-18 00:00:00','UPI','TXN10011','Annual','Success','Paid full premium'),(15,4,3,8000.00,'2026-07-18 00:00:00','UPI','TXN10012','Annual','Success','Paid full premium'),(18,48,43,12000.00,'2026-06-18 00:00:00','UPI','TXN10020','Annual','Success','Paid full premium'),(19,51,48,83333.33,'2026-07-17 23:17:00','UPI','TXN10021','Monthly','Success',''),(20,56,49,166666.67,'2026-07-18 14:56:00','UPI','TXN10030','Monthly','Success','success');
/*!40000 ALTER TABLE `premiums` ENABLE KEYS */;
UNLOCK TABLES;

