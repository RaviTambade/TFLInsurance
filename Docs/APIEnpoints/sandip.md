# Policies & Policy Master API Endpoints Documentation

> Complete reference for Policies Controller and Policy Master Controller APIs.

## Quick Reference Table — All Endpoints

| # | Method | Endpoint | Description | Controller |
|---|--------|----------|-------------|-----------|
| 1 | GET | `/api/policies` | Get all policies | Policies |
| 2 | GET | `/api/policies/{policyId}` | Get policy by ID | Policies |
| 3 | GET | `/api/policies/customer/{customerId}` | Get policies by customer | Policies |
| 4 | GET | `/api/policies/agent/{agentId}` | Get policies by agent | Policies |
| 5 | POST | `/api/policies` | Create new policy | Policies |
| 6 | PUT | `/api/policies/{policyId}` | Update existing policy | Policies |
| 7 | PUT | `/api/policies/{policyId}/renew` | Renew a policy | Policies |
| 8 | DELETE | `/api/policies/{policyId}` | Delete a policy | Policies |
| 9 | GET | `/api/policymaster/get-all` | Get all policy types | Policy Master |
| 10 | GET | `/api/policymaster/get-by-type/{policyType}` | Get specific policy type | Policy Master |



## Policies Controller Endpoints

### Base URL: `/api/policies`


### 1. Get All Policies

Retrieve a list of all customer policies in the system.

**Endpoint:** `GET /api/policies`

**Method:** GET

**Authentication:** Required (optional based on implementation)

**Request:**
```http
GET /api/policies HTTP/1.1
Host: localhost:5000
Accept: application/json
```

**Response (200 OK):**
```json
[
  {
	"policyId": 1,
	"policyNumber": "POL-2025-00001",
	"customerId": 101,
	"agentId": 5,
	"employeeId": 10,
	"policyType": "Life Insurance",
	"policyAmount": 500000.00,
	"isRenewed": false
  },
  {
	"policyId": 2,
	"policyNumber": "POL-2025-00002",
	"customerId": 102,
	"agentId": 6,
	"employeeId": 11,
	"policyType": "Health Insurance",
	"policyAmount": 250000.00,
	"isRenewed": true
  }
]
```

**Response (500 Internal Server Error):**
```json
{
  "message": "An error occurred while fetching policies."
}
```

**Status Codes:**
- `200 OK` - Successfully retrieved all policies
- `500 Internal Server Error` - Server error occurred


### 2. Get Policy by ID

Retrieve a specific policy using its ID.

**Endpoint:** `GET /api/policies/{policyId}`

**Method:** GET

**Path Parameters:**
- `policyId` (integer, required): The unique identifier of the policy

**Request:**
```http
GET /api/policies/1 HTTP/1.1
Host: localhost:5000
Accept: application/json
```

**Response (200 OK):**
```json
{
  "policyId": 1,
  "policyNumber": "POL-2025-00001",
  "customerId": 101,
  "agentId": 5,
  "employeeId": 10,
  "policyType": "Life Insurance",
  "policyAmount": 500000.00,
  "isRenewed": false
}
```

**Response (400 Bad Request):**
```json
{
  "message": "Invalid policy ID."
}
```

**Response (404 Not Found):**
```json
{
  "message": "Policy with ID 1 not found."
}
```

**Response (500 Internal Server Error):**
```json
{
  "message": "An error occurred while fetching the policy."
}
```

**Status Codes:**
- `200 OK` - Successfully retrieved policy
- `400 Bad Request` - Invalid policy ID provided
- `404 Not Found` - Policy not found
- `500 Internal Server Error` - Server error occurred

**Validation Rules:**
- `policyId` must be greater than 0


### 3. Get Policies by Customer ID

Retrieve all policies associated with a specific customer.

**Endpoint:** `GET /api/policies/customer/{customerId}`

**Method:** GET

**Path Parameters:**
- `customerId` (integer, required): The unique identifier of the customer

**Request:**
```http
GET /api/policies/customer/101 HTTP/1.1
Host: localhost:5000
Accept: application/json
```

**Response (200 OK):**
```json
[
  {
	"policyId": 1,
	"policyNumber": "POL-2025-00001",
	"customerId": 101,
	"agentId": 5,
	"employeeId": 10,
	"policyType": "Life Insurance",
	"policyAmount": 500000.00,
	"isRenewed": false
  },
  {
	"policyId": 3,
	"policyNumber": "POL-2025-00003",
	"customerId": 101,
	"agentId": 5,
	"employeeId": 10,
	"policyType": "Vehicle Insurance",
	"policyAmount": 150000.00,
	"isRenewed": true
  }
]
```

**Response (400 Bad Request):**
```json
{
  "message": "Invalid customer ID."
}
```

**Response (404 Not Found):**
```json
{
  "message": "No policies found for customer ID 101."
}
```

**Response (500 Internal Server Error):**
```json
{
  "message": "An error occurred while fetching customer policies."
}
```

**Status Codes:**
- `200 OK` - Successfully retrieved customer policies
- `400 Bad Request` - Invalid customer ID provided
- `404 Not Found` - No policies found for customer
- `500 Internal Server Error` - Server error occurred

**Validation Rules:**
- `customerId` must be greater than 0

---

### 4. Get Policies by Agent ID

Retrieve all policies assigned to a specific agent.

**Endpoint:** `GET /api/policies/agent/{agentId}`

**Method:** GET

**Path Parameters:**
- `agentId` (integer, required): The unique identifier of the agent

**Request:**
```http
GET /api/policies/agent/5 HTTP/1.1
Host: localhost:5000
Accept: application/json
```

**Response (200 OK):**
```json
[
  {
	"policyId": 1,
	"policyNumber": "POL-2025-00001",
	"customerId": 101,
	"agentId": 5,
	"employeeId": 10,
	"policyType": "Life Insurance",
	"policyAmount": 500000.00,
	"isRenewed": false
  },
  {
	"policyId": 3,
	"policyNumber": "POL-2025-00003",
	"customerId": 101,
	"agentId": 5,
	"employeeId": 10,
	"policyType": "Vehicle Insurance",
	"policyAmount": 150000.00,
	"isRenewed": true
  }
]
```

**Response (400 Bad Request):**
```json
{
  "message": "Invalid agent ID."
}
```

**Response (404 Not Found):**
```json
{
  "message": "No policies found for agent ID 5."
}
```

**Response (500 Internal Server Error):**
```json
{
  "message": "An error occurred while fetching agent policies."
}
```

**Status Codes:**
- `200 OK` - Successfully retrieved agent policies
- `400 Bad Request` - Invalid agent ID provided
- `404 Not Found` - No policies found for agent
- `500 Internal Server Error` - Server error occurred

**Validation Rules:**
- `agentId` must be greater than 0


### 5. Create New Policy

Create a new customer policy with comprehensive validation against Policy Master.

**Endpoint:** `POST /api/policies`

**Method:** POST

**Request Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "customerId": 103,
  "agentId": 5,
  "employeeId": 10,
  "policyType": "Life Insurance",
  "policyAmount": 750000.00,
  "isRenewed": false
}
```

**Response (201 Created):**
```json
{
  "message": "Policy created successfully",
  "policyId": 4,
  "policyNumber": "POL-2025-00004"
}
```

**Response (400 Bad Request):**
```json
{
  "message": "Policy data is required."
}
```

Or

```json
{
  "message": "Customer ID is required and must be greater than 0."
}
```

Or

```json
{
  "message": "Policy type 'Invalid Type' is not valid or does not exist in Policy Master."
}
```

**Response (500 Internal Server Error):**
```json
{
  "message": "An error occurred while creating the policy."
}
```

**Status Codes:**
- `201 Created` - Policy successfully created
- `400 Bad Request` - Invalid policy data
- `500 Internal Server Error` - Server error occurred

**Validation Rules:**
- `customerId` is **required** and must be > 0
- `policyType` is **required** and must exist in Policy Master
- `policyAmount` is **required** and must be > 0
- `agentId` (optional) must be > 0 if provided
- `employeeId` (optional) must be > 0 if provided
- `policyNumber` (auto-generated) Format: POL-{Year}-{SequenceNumber}

**Policy Master Validation:**
The API validates the `policyType` against the Policy Master configuration to ensure only valid policy types can be created.

### 6. Update Existing Policy

Update details of an existing policy with Policy Master validation.

**Endpoint:** `PUT /api/policies/{policyId}`

**Method:** PUT

**Path Parameters:**
- `policyId` (integer, required): The unique identifier of the policy to update

**Request Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "customerId": 103,
  "agentId": 6,
  "employeeId": 11,
  "policyType": "Health Insurance",
  "policyAmount": 300000.00,
  "isRenewed": false
}
```

**Response (200 OK):**
```json
{
  "message": "Policy updated successfully."
}
```

**Response (400 Bad Request):**
```json
{
  "message": "Invalid policy ID."
}
```

Or

```json
{
  "message": "Policy data is required."
}
```

Or

```json
{
  "message": "Policy type 'Invalid Type' is not valid or does not exist in Policy Master."
}
```

**Response (404 Not Found):**
```json
{
  "message": "Policy with ID 4 not found or could not be updated."
}
```

**Response (500 Internal Server Error):**
```json
{
  "message": "An error occurred while updating the policy."
}
```

**Status Codes:**
- `200 OK` - Policy successfully updated
- `400 Bad Request` - Invalid policy data
- `404 Not Found` - Policy not found
- `500 Internal Server Error` - Server error occurred

**Validation Rules:**
- `policyId` must be > 0
- `customerId` must be > 0
- `policyType` must exist in Policy Master
- `agentId` (optional) must be > 0 if provided
- `employeeId` (optional) must be > 0 if provided

---

### 7. Renew a Policy

Renew an existing policy and update its status.

**Endpoint:** `PUT /api/policies/{policyId}/renew`

**Method:** PUT

**Path Parameters:**
- `policyId` (integer, required): The unique identifier of the policy to renew

**Request:**
```http
PUT /api/policies/1/renew HTTP/1.1
Host: localhost:5000
```

**Response (200 OK):**
```json
{
  "message": "Policy renewed successfully."
}
```

**Response (400 Bad Request):**
```json
{
  "message": "Invalid policy ID."
}
```

**Response (404 Not Found):**
```json
{
  "message": "Policy with ID 1 not found or could not be renewed."
}
```

**Response (500 Internal Server Error):**
```json
{
  "message": "An error occurred while renewing the policy."
}
```

**Status Codes:**
- `200 OK` - Policy successfully renewed
- `400 Bad Request` - Invalid policy ID
- `404 Not Found` - Policy not found
- `500 Internal Server Error` - Server error occurred

**Validation Rules:**
- `policyId` must be > 0


### 8. Delete a Policy

Delete a policy from the system permanently.

**Endpoint:** `DELETE /api/policies/{policyId}`

**Method:** DELETE

**Path Parameters:**
- `policyId` (integer, required): The unique identifier of the policy to delete

**Request:**
```http
DELETE /api/policies/1 HTTP/1.1
Host: localhost:5000
```

**Response (204 No Content):**
```
(Empty body)
```

**Response (400 Bad Request):**
```json
{
  "message": "Invalid policy ID."
}
```

**Response (404 Not Found):**
```json
{
  "message": "Policy with ID 1 not found."
}
```

**Response (500 Internal Server Error):**
```json
{
  "message": "An error occurred while deleting the policy."
}
```

**Status Codes:**
- `204 No Content` - Policy successfully deleted
- `400 Bad Request` - Invalid policy ID
- `404 Not Found` - Policy not found
- `500 Internal Server Error` - Server error occurred

**Validation Rules:**
- `policyId` must be > 0

---

## Policy Master Controller Endpoints

### Base URL: `/api/policymaster`


### 9. Get All Policy Types

Retrieve all available policy types from Policy Master configuration.

**Endpoint:** `GET /api/policymaster/get-all`

**Method:** GET

**Request:**
```http
GET /api/policymaster/get-all HTTP/1.1
Host: localhost:5000
Accept: application/json
```

**Response (200 OK):**
```json
{
  "policyTypes": [
	{
	  "policyType": "Life Insurance",
	  "description": "Comprehensive life insurance coverage",
	  "minimumAmount": 100000.00,
	  "maximumAmount": 10000000.00,
	  "premiumFrequency": ["Monthly", "Quarterly", "Annual"],
	  "active": true
	},
	{
	  "policyType": "Health Insurance",
	  "description": "Complete health insurance coverage",
	  "minimumAmount": 50000.00,
	  "maximumAmount": 5000000.00,
	  "premiumFrequency": ["Monthly", "Annual"],
	  "active": true
	},
	{
	  "policyType": "Vehicle Insurance",
	  "description": "Vehicle insurance coverage",
	  "minimumAmount": 25000.00,
	  "maximumAmount": 1000000.00,
	  "premiumFrequency": ["Monthly", "Annual"],
	  "active": true
	}
  ]
}
```

**Response (404 Not Found):**
```json
{
  "message": "Policy master configuration file was not found."
}
```

**Response (500 Internal Server Error):**
```json
{
  "message": "An error occurred while fetching policy master data."
}
```

**Status Codes:**
- `200 OK` - Successfully retrieved all policy types
- `404 Not Found` - Configuration file not found
- `500 Internal Server Error` - Server error occurred


### 10. Get Specific Policy Type

Retrieve details of a specific policy type from Policy Master.

**Endpoint:** `GET /api/policymaster/get-by-type/{policyType}`

**Method:** GET

**Path Parameters:**
- `policyType` (string, required): The name of the policy type to retrieve

**Request:**
```http
GET /api/policymaster/get-by-type/Life%20Insurance HTTP/1.1
Host: localhost:5000
Accept: application/json
```

**Response (200 OK):**
```json
{
  "policyType": "Life Insurance",
  "description": "Comprehensive life insurance coverage",
  "minimumAmount": 100000.00,
  "maximumAmount": 10000000.00,
  "premiumFrequency": ["Monthly", "Quarterly", "Annual"],
  "active": true
}
```

**Response (400 Bad Request):**
```json
{
  "message": "Policy type cannot be empty."
}
```

**Response (404 Not Found):**
```json
{
  "message": "Policy type 'Invalid Type' not found."
}
```

Or

```json
{
  "message": "Policy master configuration file was not found."
}
```

**Response (500 Internal Server Error):**
```json
{
  "message": "An error occurred while fetching policy type data."
}
```

**Status Codes:**
- `200 OK` - Successfully retrieved policy type
- `400 Bad Request` - Empty policy type provided
- `404 Not Found` - Policy type not found
- `500 Internal Server Error` - Server error occurred

**Validation Rules:**
- `policyType` cannot be empty or null
- `policyType` is case-insensitive (searches using OrdinalIgnoreCase)

## Data Models

### Policy Object

```json
{
  "policyId": "integer (PK)",
  "policyNumber": "string (auto-generated format: POL-{Year}-{Sequence})",
  "customerId": "integer (required, FK)",
  "agentId": "integer (optional, nullable, FK)",
  "employeeId": "integer (optional, nullable, FK)",
  "policyType": "string (required, validated against Policy Master)",
  "policyAmount": "decimal (required, > 0)",
  "isRenewed": "boolean (default: false)"
}
```

### PolicyType Object (Policy Master)

```json
{
  "policyType": "string (name of policy type)",
  "description": "string (description of policy type)",
  "minimumAmount": "decimal (minimum coverage amount)",
  "maximumAmount": "decimal (maximum coverage amount)",
  "premiumFrequency": "string[] (available payment frequencies)",
  "active": "boolean (whether policy type is active)"
}
```

## Key Features

### ✅ Policy Management
- Create policies with automatic policy number generation
- Retrieve policies by ID, customer, or agent
- Update policy details
- Renew policies
- Delete policies
- Full validation of all policy fields

### ✅ Policy Master Integration
- Validate policy types against Policy Master configuration
- Access Policy Master data through dedicated endpoints
- Support for case-insensitive policy type lookups

### ✅ Validation Features
- **Customer ID validation** - Required and must be valid
- **Policy Type validation** - Must exist in Policy Master
- **Amount validation** - Must be within Policy Master limits
- **Agent/Employee validation** - Optional but valid if provided
- **Auto-generated Policy Numbers** - Format: POL-{Year}-{SequentialNumber}

### ✅ Error Handling
- Comprehensive error messages for all scenarios
- Appropriate HTTP status codes
- Structured error responses
- Detailed logging for debugging

###  ✅ Best Practices
- Follows REST API conventions
- Case-insensitive policy type matching
- Synchronous processing for consistency
- Input validation at service layer
- Structured logging throughout

## Database Stored Procedures Required

The following stored procedures should be created in the database to support these endpoints:

- `USP_POLICY_GET_ALL` - Retrieve all policies
- `USP_POLICY_GET_BY_ID` - Retrieve policy by ID
- `USP_POLICY_GET_BY_CUSTOMER_ID` - Retrieve policies for a customer
- `USP_POLICY_GET_BY_AGENT_ID` - Retrieve policies for an agent
- `USP_POLICY_CREATE` - Create new policy
- `USP_POLICY_UPDATE` - Update existing policy
- `USP_POLICY_UPDATE_RENEWAL` - Update policy renewal status
- `USP_POLICY_DELETE` - Delete policy


## Configuration Files Required

- **policy-master.json** - Contains Policy Master data in Configuration folder
  - File Path: `{ProjectRoot}/Configuration/policy-master.json`
  - Format: JSON array of PolicyTypeDto objects



## Dependencies & Registrations

**Services to register in Program.cs:**

```csharp
// Policy Services
builder.Services.AddScoped<IPolicyRepository, PolicyRepository>();
builder.Services.AddScoped<IPolicyService, PolicyService>();

// Policy Master Services
builder.Services.AddScoped<IPolicyMasterRepository, PolicyMasterRepository>();
builder.Services.AddScoped<IPolicyMasterService, PolicyMasterService>();
```

## Example Usage

### Creating a Policy

```bash
curl -X POST http://localhost:5000/api/policies \
  -H "Content-Type: application/json" \
  -d '{
	"customerId": 101,
	"agentId": 5,
	"employeeId": 10,
	"policyType": "Life Insurance",
	"policyAmount": 500000
  }'
```

### Getting Customer Policies

```bash
curl -X GET http://localhost:5000/api/policies/customer/101
```

### Validating Policy Type

```bash
curl -X GET http://localhost:5000/api/policymaster/get-by-type/Life%20Insurance
```



## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-XX | Initial release with all Policies and Policy Master endpoints |



## Support

For issues or questions regarding these APIs, please contact the development team or create an issue in the repository.
