# Customer Policies Implementation - Complete Index

## 📋 Project Overview

This document provides a complete index of all Customer Policies implementation files across the LicInsurance.Api solution, including database scripts, C# code, and documentation.

---

## 🗂️ File Structure

### Database Layer
- **Table Definition**
  - `Database/CustomerPolicies.sql` - MySQL table structure

- **Stored Procedures**
  - `Database/StoredProcedures/USP_CustomerPolicy.sql` - All 8 SQL procedures

- **Documentation**
  - `Database/README.md` - Database setup guide
  - `Database/StoredProcedures/StoredProcedures_Documentation.md` - Complete SP docs
  - `Database/StoredProcedures/QuickReference.txt` - Quick reference guide

### C# Constants
- `Data/Constants/CustomerPoliciesStoredProcedure.cs` - SP name mapping

### Repository Layer
- `Repositories/Interfaces/ICustomerPolicyRepository.cs` - Interface with 8 methods
- `Repositories/CustomerPolicyRepository.cs` - Dapper implementation

### Service Layer
- `Services/Interfaces/ICustomerPolicyService.cs` - Service interface with 8 methods
- `Services/CustomerPolicyService.cs` - Business logic implementation

### API Controller
- `Controllers/CustomerPoliciesController.cs` - REST API endpoints

---

## 📊 8 Implemented Methods

### 1. CreateCustomerPolicy / GetAllCustomerPolicies
| Aspect | Details |
|--------|---------|
| **SQL SP** | USP_CUSTOMER_POLICY_SAVE |
| **REST** | POST /api/CustomerPolicies |
| **Purpose** | Create new customer policy |
| **Parameters** | CustomerId, PolicyId, Status, PremiumAmount, etc. |

### 2. GetCustomerPolicyById
| Aspect | Details |
|--------|---------|
| **SQL SP** | USP_CUSTOMER_POLICY_GET_BY_ID |
| **REST** | GET /api/CustomerPolicies/{id} |
| **Purpose** | Retrieve policy by ID |
| **Parameters** | CustomerPolicyId |

### 3. GetPoliciesByCustomerId
| Aspect | Details |
|--------|---------|
| **SQL SP** | USP_CUSTOMER_POLICY_GET_BY_CUSTOMER_ID |
| **REST** | GET /api/CustomerPolicies/customer/{customerId} |
| **Purpose** | Get all policies for customer |
| **Parameters** | CustomerId |

### 4. GetCustomerPoliciesByStatus
| Aspect | Details |
|--------|---------|
| **SQL SP** | USP_CUSTOMER_POLICY_GET_BY_CUSTOMER_AND_STATUS |
| **REST** | GET /api/CustomerPolicies/customer/{customerId}/status/{status} |
| **Purpose** | Get policies by customer and status |
| **Parameters** | CustomerId, Status |

### 5. UpdateCustomerPolicy
| Aspect | Details |
|--------|---------|
| **SQL SP** | USP_CUSTOMER_POLICY_UPDATE |
| **REST** | PUT /api/CustomerPolicies/{id} |
| **Purpose** | Update existing policy |
| **Parameters** | CustomerPolicyId + update fields |

### 6. DeleteCustomerPolicy
| Aspect | Details |
|--------|---------|
| **SQL SP** | USP_CUSTOMER_POLICY_DELETE |
| **REST** | DELETE /api/CustomerPolicies/{id} |
| **Purpose** | Delete policy record |
| **Parameters** | CustomerPolicyId |

### 7. RenewCustomerPolicy
| Aspect | Details |
|--------|---------|
| **SQL SP** | USP_CUSTOMER_POLICY_RENEW |
| **REST** | POST /api/CustomerPolicies/{id}/renew |
| **Purpose** | Renew policy (extend + activate) |
| **Parameters** | CustomerPolicyId, RenewalPeriodInMonths |

---

## 🏗️ Architecture Layers

### Layer 1: Controller
**File:** `Controllers/CustomerPoliciesController.cs`

```
HTTP Request
	↓
[ApiController] CustomerPoliciesController
	↓
Injects: ICustomerPolicyService
	↓
8 Public Methods (GET/POST/PUT/DELETE/POST)
```

**Methods:**
- GET /api/CustomerPolicies → GetAllCustomerPolicies()
- GET /api/CustomerPolicies/{id} → GetCustomerPolicyById()
- GET /api/CustomerPolicies/customer/{customerId} → GetPoliciesByCustomerId()
- GET /api/CustomerPolicies/customer/{customerId}/status/{status} → GetCustomerPoliciesByStatus()
- POST /api/CustomerPolicies → CreateCustomerPolicy()
- PUT /api/CustomerPolicies/{id} → UpdateCustomerPolicy()
- DELETE /api/CustomerPolicies/{id} → DeleteCustomerPolicy()
- POST /api/CustomerPolicies/{id}/renew → RenewCustomerPolicy()

### Layer 2: Service
**Files:** 
- `Services/Interfaces/ICustomerPolicyService.cs`
- `Services/CustomerPolicyService.cs`

```
Controller Call
	↓
ICustomerPolicyService (Interface)
	↓
CustomerPolicyService (Implementation)
	- Validation
	- Business Logic
	- Error Handling
	↓
Injects: ICustomerPolicyRepository
	↓
Repository Call
```

**Responsibilities:**
- Input validation
- Business logic
- Logging
- Exception handling

### Layer 3: Repository
**Files:**
- `Repositories/Interfaces/ICustomerPolicyRepository.cs`
- `Repositories/CustomerPolicyRepository.cs`

```
Service Call
	↓
ICustomerPolicyRepository (Interface)
	↓
CustomerPolicyRepository (Implementation)
	- Dapper ORM calls
	- Stored Procedure mapping
	↓
Injects: IDapperfactory
	↓
Database Call
```

**Responsibilities:**
- Data access
- Dapper configuration
- SP parameter mapping

### Layer 4: Database
**Files:**
- `Database/CustomerPolicies.sql` (Table)
- `Database/StoredProcedures/USP_CustomerPolicy.sql` (SPs)

```
Repository Call
	↓
Dapper Query/Execute
	↓
MySql Connection
	↓
8 Stored Procedures
	↓
customer_policies Table
```

---

## 📁 Complete File Reference

### Database Files

```
Database/
├── CustomerPolicies.sql
│   └── Purpose: MySQL table creation script
│   └── Contents: Table structure, indexes, constraints
│   └── Records: 33 lines
│   └── Type: DDL Script
│
├── README.md
│   └── Purpose: Database setup guide
│   └── Contents: Instructions, troubleshooting, testing
│   └── Type: Documentation
│
└── StoredProcedures/
	├── USP_CustomerPolicy.sql
	│   └── Purpose: All 8 stored procedure definitions
	│   └── Contents: Complete SP implementations with error handling
	│   └── Records: 600+ lines
	│   └── Type: SQL with Transactions & Error Handling
	│
	├── StoredProcedures_Documentation.md
	│   └── Purpose: Detailed documentation for each SP
	│   └── Contents: Parameters, validations, examples, C# integration
	│   └── Type: Markdown Reference
	│
	└── QuickReference.txt
		└── Purpose: Quick lookup for all SPs
		└── Contents: Summary tables, parameter list, common use cases
		└── Type: Text Reference
```

### C# Constants File

```
Data/Constants/
└── CustomerPoliciesStoredProcedure.cs
	└── Purpose: Map SP names to C# constants
	└── Contents: 8 const strings for SP names
	└── Usage: Referenced in Repository layer
	└── Pattern: CUSTOMER_POLICY_XXX = "USP_CUSTOMER_POLICY_XXX"
```

### Repository Files

```
Repositories/
├── Interfaces/
│   └── ICustomerPolicyRepository.cs
│       └── Namespace: TFLInsurance.LicInsurance.Repositories.Interfaces
│       └── Methods: 8 method signatures
│       └── Dependencies: LicInsurance.Api.Models
│
└── CustomerPolicyRepository.cs
	└── Namespace: TFLInsurance.LicInsurance.Repositories
	└── Implementation: Dapper-based CRUD
	└── Methods: 8 implementations
	└── Dependencies: IDapperfactory, CustomerPoliciesStoredProcedure
```

### Service Files

```
Services/
├── Interfaces/
│   └── ICustomerPolicyService.cs
│       └── Namespace: TFLInsurance.LicInsurance.Services.Interfaces
│       └── Methods: 8 method signatures
│       └── Dependencies: LicInsurance.Api.Models
│
└── CustomerPolicyService.cs
	└── Namespace: TFLInsurance.LicInsurance.Services
	└── Implementation: Business logic + validation
	└── Methods: 8 implementations
	└── Dependencies: ICustomerPolicyRepository, ILogger<T>
```

### Controller Files

```
Controllers/
└── CustomerPoliciesController.cs
	└── Namespace: LicInsurance.Api.Controllers
	└── Type: [ApiController]
	└── Route: api/[controller]
	└── Methods: 8 public async methods
	└── Dependencies: ICustomerPolicyService, ILogger<T>
	└── Response Types: IActionResult with proper HTTP status codes
```

---

## 🔍 Method Mapping Reference

### API → Service → Repository → Database

| # | API Endpoint | Service Method | Repository Method | SQL Procedure |
|---|---|---|---|---|
| 1 | `POST /api/CustomerPolicies` | CreateCustomerPolicy() | CreateCustomerPolicy() | USP_CUSTOMER_POLICY_SAVE |
| 2 | `PUT /api/CustomerPolicies/{id}` | UpdateCustomerPolicy() | UpdateCustomerPolicy() | USP_CUSTOMER_POLICY_UPDATE |
| 3 | `GET /api/CustomerPolicies` | GetAllCustomerPolicies() | GetAllCustomerPolicies() | USP_CUSTOMER_POLICY_GET_ALL |
| 4 | `GET /api/CustomerPolicies/{id}` | GetCustomerPolicyById() | GetCustomerPolicyById() | USP_CUSTOMER_POLICY_GET_BY_ID |
| 5 | `DELETE /api/CustomerPolicies/{id}` | DeleteCustomerPolicy() | DeleteCustomerPolicy() | USP_CUSTOMER_POLICY_DELETE |
| 6 | `GET /api/CustomerPolicies/customer/{customerId}` | GetPoliciesByCustomerId() | GetPoliciesByCustomerId() | USP_CUSTOMER_POLICY_GET_BY_CUSTOMER_ID |
| 7 | `GET /api/CustomerPolicies/customer/{customerId}/status/{status}` | GetCustomerPoliciesByStatus() | GetCustomerPoliciesByStatus() | USP_CUSTOMER_POLICY_GET_BY_CUSTOMER_AND_STATUS |
| 8 | `POST /api/CustomerPolicies/{id}/renew` | RenewCustomerPolicy() | RenewCustomerPolicy() | USP_CUSTOMER_POLICY_RENEW |

---

## 🎯 Getting Started

### 1. Database Setup
1. Execute `Database/CustomerPolicies.sql`
2. Execute `Database/StoredProcedures/USP_CustomerPolicy.sql`
3. Verify procedures exist: `SHOW PROCEDURES LIKE 'USP_CUSTOMER_%'`

### 2. Verify C# Code
1. Check `Data/Constants/CustomerPoliciesStoredProcedure.cs`
2. Review `Repositories/CustomerPolicyRepository.cs`
3. Verify `Services/CustomerPolicyService.cs`
4. Test `Controllers/CustomerPoliciesController.cs`

### 3. Test Endpoints
```bash
# Get all policies
GET http://localhost:5000/api/CustomePolicies

# Get specific policy
GET http://localhost:5000/api/CustomePolicies/1

# Get customer's policies
GET http://localhost:5000/api/CustomePolicies/customer/1

# Get policies by status
GET http://localhost:5000/api/CustomePolicies/customer/1/status/Active

# Create
POST http://localhost:5000/api/CustomePolicies
Body: { "customerId": 1, "policyId": 1, "status": "Active", "premiumAmount": 50000 }

# Update
PUT http://localhost:5000/api/CustomePolicies/1
Body: { "customerId": 1, "policyId": 1, "premiumAmount": 55000 }

# Renew
POST http://localhost:5000/api/CustomePolicies/1/renew

# Delete
DELETE http://localhost:5000/api/CustomePolicies/1
```

---

## 📚 Documentation Map

| Document | Location | Purpose |
|----------|----------|---------|
| Setup Guide | Database/README.md | Database installation & configuration |
| Quick Reference | Database/StoredProcedures/QuickReference.txt | Procedure summary & parameters |
| Full Documentation | Database/StoredProcedures/StoredProcedures_Documentation.md | Detailed SP docs with examples |
| SQL Code | Database/StoredProcedures/USP_CustomerPolicy.sql | Complete SP implementations |
| Table Schema | Database/CustomerPolicies.sql | MySQL table structure |

---

## ✅ Implementation Checklist

- [x] Database table created (`customer_policies`)
- [x] 8 stored procedures implemented
- [x] C# constants defined
- [x] Repository interface created
- [x] Repository implementation (Dapper)
- [x] Service interface created
- [x] Service implementation with validation
- [x] Controller with 8 API endpoints
- [x] Proper dependency injection
- [x] Error handling throughout
- [x] Comprehensive documentation

---

## 🚀 Technology Stack

- **Database:** MySQL 5.7+
- **.NET Version:** 10
- **ORM:** Dapper
- **Architecture:** Layered (Controller → Service → Repository → Database)
- **API Style:** RESTful

---

## 📞 Support Resources

- **Setup Issues:** See Database/README.md → Troubleshooting
- **Procedure Details:** See Database/StoredProcedures/StoredProcedures_Documentation.md
- **Quick Lookup:** See Database/StoredProcedures/QuickReference.txt
- **Code Location:** Check file references above

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Dec 2024 | Initial implementation - 8 complete methods |

---

**Last Updated:** December 2024  
**Status:** ✅ Production Ready  
**Maintainer:** Development Team
