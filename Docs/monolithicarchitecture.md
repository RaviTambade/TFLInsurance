## TFL Insurance Management System - Monolithic Architecture

```text
                                +--------------------------------------+
                                |          Web Browser / SPA           |
                                |       (React / Angular Client)       |
                                +------------------+-------------------+
                                                   |
                                            HTTP / HTTPS
                                                   |
                                                   v
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|                    ASP.NET Core Web API (Monolithic Application)                          |
|                                                                                           |
|-------------------------------------------------------------------------------------------|
|                                                                                           |
|  Authentication & Authorization (JWT)                                                     |
|  Logging (Serilog)                                                                        |
|  Validation                                                                               |
|  Exception Handling Middleware                                                            |
|                                                                                           |
|-------------------------------------------------------------------------------------------|
|                                                                                           |
|                               Controllers Layer                                           |
|                                                                                           |
|  +------------------+  +------------------+  +------------------+                         |
|  | CustomersController| | PoliciesController| | PremiumController |                        |
|  +------------------+  +------------------+  +------------------+                         |
|                                                                                           |
|  +------------------+  +------------------+  +------------------------+                   |
|  | ClaimsController |  | AccountsController| | InsuranceManagerController|                |
|  +------------------+  +------------------+  +------------------------+                   |
|                                                                                           |
|                +------------------------+                                                  |
|                |   AgentsController     |                                                  |
|                +------------------------+                                                  |
|                                                                                           |
|-------------------------------------------------------------------------------------------|
|                                                                                           |
|                             Business Services Layer                                       |
|                                                                                           |
| CustomerService     PolicyService      PremiumService                                     |
| ClaimService        AccountService     AgentService                                       |
| InsuranceManagerService   NotificationService                                              |
| ReportService       AuthenticationService                                                  |
|                                                                                           |
|-------------------------------------------------------------------------------------------|
|                                                                                           |
|                           Repository / Data Access Layer                                  |
|                                                                                           |
| CustomerRepository      PolicyRepository                                                   |
| PremiumRepository       ClaimRepository                                                    |
| PaymentRepository       AccountRepository                                                  |
| AgentRepository         ReportRepository                                                   |
| UserRepository          AuditRepository                                                    |
|                                                                                           |
|-------------------------------------------------------------------------------------------|
|                                                                                           |
|                              Domain Models                                                |
|                                                                                           |
| Customer     Policy      Premium      Payment      Claim                                  |
| Agent        Nominee     Receipt      LedgerEntry  Refund                                 |
| User         Role        SurveyReport ClaimSettlement                                     |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
                                                   |
                                            Entity Framework
                                              / Dapper ORM
                                                   |
                                                   v
+-------------------------------------------------------------------------------------------+
|                                    MySQL Database                                         |
|-------------------------------------------------------------------------------------------|
|                                                                                           |
| Users                  Roles                 Customers                                    |
| Agents                 Policies              CustomerPolicies                             |
| PremiumSchedules       PremiumPayments       Claims                                       |
| ClaimDocuments         SurveyReports         ClaimSettlements                             |
| Payments               Receipts              LedgerEntries                                |
| Refunds                AuditLogs             Notifications                               |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
```

---

# Request Flow

```text
Browser / Mobile App
        |
        | HTTP Request
        v
CustomersController
        |
        v
CustomerService
        |
        v
CustomerRepository
        |
        v
MySQL Database
        |
        v
Repository
        |
        v
Service
        |
        v
Controller
        |
        v
JSON Response
```

---

# Characteristics of the Monolithic Architecture

* **Single ASP.NET Core Web API application** hosts all business modules.
* All controllers, services, repositories, and domain models are deployed together.
* One **MySQL database** stores all insurance-related data.
* Shared authentication, logging, validation, and exception handling across modules.
* Simple deployment as a single application.
* Easier to develop and debug for small to medium-sized teams.
* Suitable for learning enterprise application architecture before evolving to microservices.

This architecture provides a strong foundation for the TFL Insurance project and can later be refactored into independent microservices such as **Customer Service**, **Policy Service**, **Premium Service**, **Claims Service**, **Accounts Service**, and **Notification Service** as the application scales.
