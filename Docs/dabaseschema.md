 

# Insurance Management System Database Schema (MySQL)

## 1. Policy Master (def_policies)

Stores all insurance products.

| Column Name         | Data Type     | Constraints        | Description           |
| ------------------- | ------------- | ------------------ | --------------------- |
| policy_id           | INT           | PK, AUTO_INCREMENT | Policy Id             |
| policy_name         | VARCHAR(100)  | NOT NULL           | Policy Name           |
| policy_type         | VARCHAR(50)   | NOT NULL           | Life, Health, Vehicle |
| description         | TEXT          | NULL               | Policy Description    |
| minimum_sum_assured | DECIMAL(12,2) |                    | Minimum Coverage      |
| maximum_sum_assured | DECIMAL(12,2) |                    | Maximum Coverage      |
| minimum_duration    | INT           |                    | Years                 |
| maximum_duration    | INT           |                    | Years                 |
| is_active           | BOOLEAN       | DEFAULT TRUE       | Status                |
| created_on          | DATETIME      |                    | Created Date          |



## 2. Departments (def_departments)

| Column Name     | Data Type    | Constraints       |
| --------------- | ------------ | ----------------- |
| department_id   | INT          | PK AUTO_INCREMENT |
| department_name | VARCHAR(100) | NOT NULL          |
| description     | VARCHAR(200) | NULL              |

Examples

* Sales
* Claims
* Customer Service
* Accounts
* Underwriting
* Renewal



## 3. Roles (def_roles)

| Column Name | Data Type    | Constraints       |
| ----------- | ------------ | ----------------- |
| role_id     | INT          | PK AUTO_INCREMENT |
| role_name   | VARCHAR(50)  | UNIQUE            |
| description | VARCHAR(100) |                   |

Examples

* Admin
* Manager
* Agent
* Customer
* Executive


# Transaction Tables

## 4. Users (dat_users)

| Column Name   | Data Type    | Constraints        |
| ------------- | ------------ | ------------------ |
| user_id       | INT          | PK AUTO_INCREMENT  |
| username      | VARCHAR(50)  | UNIQUE             |
| password_hash | VARCHAR(255) |                    |
| first_name    | VARCHAR(50)  |                    |
| last_name     | VARCHAR(50)  |                    |
| email         | VARCHAR(100) | UNIQUE             |
| mobile_number | VARCHAR(15)  |                    |
| role_id       | INT          | FK def_roles       |
| department_id | INT          | FK def_departments |
| is_active     | BOOLEAN      | DEFAULT TRUE       |
| created_on    | DATETIME     |                    |



## 5. Customers (dat_customers)

| Column Name       | Data Type                     | Constraints       |
| ----------------- | ----------------------------- | ----------------- |
| customer_id       | INT                           | PK AUTO_INCREMENT |
| first_name        | VARCHAR(50)                   |                   |
| middle_name       | VARCHAR(50)                   |                   |
| last_name         | VARCHAR(50)                   |                   |
| dob               | DATE                          |                   |
| gender            | ENUM('Male','Female','Other') |                   |
| email             | VARCHAR(100)                  |                   |
| phone             | VARCHAR(15)                   |                   |
| address           | VARCHAR(255)                  |                   |
| city              | VARCHAR(50)                   |                   |
| state             | VARCHAR(50)                   |                   |
| country           | VARCHAR(50)                   |                   |
| pincode           | VARCHAR(10)                   |                   |
| pan_number        | VARCHAR(20)                   | UNIQUE            |
| nominee_name      | VARCHAR(100)                  |                   |
| nominee_relation  | VARCHAR(50)                   |                   |
| nominee_mobile    | VARCHAR(15)                   |                   |
| registration_date | DATETIME                      |                   |
| total_policies    | INT                           | DEFAULT 0         |
| assigned_agent_id | INT                           | FK dat_users      |
| is_active         | BOOLEAN                       | DEFAULT TRUE      |


## 6. Customer Policies (dat_customer_policies)

Represents purchased insurance policies.

| Column Name        | Data Type                                      | Constraints       |
| ------------------ | ---------------------------------------------- | ----------------- |
| customer_policy_id | INT                                            | PK AUTO_INCREMENT |
| customer_id        | INT                                            | FK dat_customers  |
| policy_id          | INT                                            | FK def_policies   |
| policy_number      | VARCHAR(30)                                    | UNIQUE            |
| premium_amount     | DECIMAL(12,2)                                  |                   |
| sum_assured        | DECIMAL(12,2)                                  |                   |
| policy_duration    | INT                                            | Years             |
| start_date         | DATE                                           |                   |
| maturity_date      | DATE                                           |                   |
| premium_due_date   | DATE                                           |                   |
| policy_status      | ENUM('Active','Expired','Cancelled','Matured') |                   |
| created_on         | DATETIME                                       |                   |

---

## 7. Premium Payments (dat_premium_payments)

| Column Name           | Data Type                               | Constraints              |
| --------------------- | --------------------------------------- | ------------------------ |
| payment_id            | INT                                     | PK AUTO_INCREMENT        |
| customer_policy_id    | INT                                     | FK dat_customer_policies |
| installment_no        | INT                                     |                          |
| premium_amount        | DECIMAL(12,2)                           |                          |
| payment_date          | DATE                                    |                          |
| payment_mode          | ENUM('Cash','UPI','Card','Net Banking') |                          |
| transaction_reference | VARCHAR(100)                            |                          |
| payment_status        | ENUM('Paid','Pending','Failed')         |                          |

---

# Optional Tables (Recommended)

## 8. Claims

```
dat_claims
------------

claim_id
customer_policy_id
claim_date
claim_amount
approved_amount
claim_reason
claim_status
approved_by
approved_date
```

---

## 9. Renewals

```
dat_renewals
----------------

renewal_id
customer_policy_id
renewal_date
next_due_date
premium_amount
status
```

---

## 10. Policy Documents

```
dat_documents
----------------

document_id
customer_policy_id
document_name
document_path
uploaded_on
```

---

# Database Relationship Diagram

```text
                    +----------------------+
                    |     def_roles        |
                    +----------------------+
                              |
                              |
                              |
                    +----------------------+
                    |      dat_users       |
                    +----------------------+
                              |
                              |
               +--------------+--------------+
               |                             |
               |                             |
      +-------------------+         +----------------------+
      | def_departments   |         |   dat_customers      |
      +-------------------+         +----------------------+
                                             |
                                             |
                                             |
                                   +-------------------------+
                                   | dat_customer_policies   |
                                   +-------------------------+
                                     |                  |
                                     |                  |
                                     |                  |
                          +------------------+   +----------------+
                          |  def_policies    |   | PremiumPayment |
                          +------------------+   +----------------+
                                                     |
                                                     |
                                              +--------------+
                                              |   Claims     |
                                              +--------------+
```

---

# Suggested Project Structure

```text
InsuranceDB
│
├── Master Tables
│      def_policies
│      def_departments
│      def_roles
│
├── User Management
│      dat_users
│
├── Customer Management
│      dat_customers
│
├── Policy Management
│      dat_customer_policies
│
├── Premium Management
│      dat_premium_payments
│
├── Claims Management
│      dat_claims
│
├── Renewal Management
│      dat_renewals
│
└── Documents
       dat_documents
```

This schema is normalized (approximately Third Normal Form), uses consistent naming conventions (`def_` for master tables and `dat_` for transactional tables), supports future modules such as claims and renewals, and is well suited as a proof of concept for an ASP.NET Core Web API or Node.js backend with a MySQL database.


Generated by AI (Chatgpt)

Modified by shital

<<<<<<< HEAD
Modified by apurva
=======
Modified by milind
>>>>>>> dce98299280f0d20fa93f399765e94de5f337371
Modified by apurva