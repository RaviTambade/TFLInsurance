# TFL Insurance -- Claims API Documentation

## Module: Claims

This document contains the Claims APIs implemented so far in the TFL
Insurance backend.

### Base URL

Replace the port with the port on which the API is running locally.

```text
https://localhost:<port>
```

Example:

```text
https://localhost:7042
```

---

## Claims API Summary

|   # | Module | Method  | API URL                             | Description                            |
| --: | ------ | ------- | ----------------------------------- | -------------------------------------- |
|   1 | Claim  | `GET`   | `/api/Claims`                       | Get all claims                         |
|   2 | Claim  | `GET`   | `/api/Claims/{claimId}`             | Get claim details by Claim ID          |
|   3 | Claim  | `GET`   | `/api/Claims/customer/{customerId}` | Get all claims belonging to a customer |
|   4 | Claim  | `POST`  | `/api/Claims`                       | Create / submit a new claim            |
|   5 | Claim  | `PUT`   | `/api/Claims/{claimId}`             | Update claim information               |
|   6 | Claim  | `PATCH` | `/api/Claims/{claimId}/status`      | Change claim status                    |
|   7 | Claim  | `PATCH` | `/api/Claims/{claimId}/approve`     | Approve a claim                        |
|   8 | Claim  | `PATCH` | `/api/Claims/{claimId}/reject`      | Reject a claim                         |

> **Note:** Claim document upload/retrieval APIs are not included here
> because they have not been implemented yet.

---

# 1. Get All Claims

### API Details

Property Value

---

Module Claim
Method `GET`
Endpoint `/api/Claims`
Full URL `https://localhost:<port>/api/Claims`
Request Body None

### Purpose

Returns all claims available in the system.

### Postman

```text
GET https://localhost:<port>/api/Claims
```

No request body is required.

### Sample Response

**HTTP 200 OK**

```json
[
  {
    "claimId": 1,
    "policyNumber": "POL10001",
    "customerId": 101,
    "claimDate": "2026-08-09T10:00:00",
    "claimType": "Motor",
    "reason": "Vehicle damaged in accident",
    "claimAmount": 55000,
    "approvedAmount": 50000,
    "status": "Approved",
    "remarks": "Claim approved after document verification.",
    "settlementDate": null
  }
]
```

### Empty Result

If no claims are available:

**HTTP 200 OK**

```json
[]
```

---

# 2. Get Claim By ID

### API Details

Property Value

---

Module Claim
Method `GET`
Endpoint `/api/Claims/{claimId}`
Full URL `https://localhost:<port>/api/Claims/1`
Request Body None

### Purpose

Returns the details of a specific claim using its Claim ID.

### Path Parameter

Parameter Type Required Description

---

`claimId` Integer Yes Unique Claim ID

### Postman Example

```text
GET https://localhost:<port>/api/Claims/1
```

No request body is required.

### Sample Response

**HTTP 200 OK**

```json
{
  "claimId": 1,
  "policyNumber": "POL10001",
  "customerId": 101,
  "claimDate": "2026-08-09T10:00:00",
  "claimType": "Motor",
  "reason": "Vehicle damaged in accident",
  "claimAmount": 55000,
  "approvedAmount": 50000,
  "status": "Approved",
  "remarks": "Claim approved after document verification.",
  "settlementDate": null
}
```

### Claim Not Found

If the Claim ID does not exist:

**HTTP 404 Not Found**

```text
Claim not found.
```

---

# 3. Get Customer Claims

### API Details

Property Value

---

Module Claim
Method `GET`
Endpoint `/api/Claims/customer/{customerId}`
Full URL `https://localhost:<port>/api/Claims/customer/101`
Request Body None

### Purpose

Returns all claims submitted by a particular customer.

### Path Parameter

Parameter Type Required Description

---

`customerId` Integer Yes Customer ID

### Postman Example

```text
GET https://localhost:<port>/api/Claims/customer/101
```

No request body is required.

### Sample Response

**HTTP 200 OK**

```json
[
  {
    "claimId": 1,
    "policyNumber": "POL10001",
    "customerId": 101,
    "claimDate": "2026-08-09T10:00:00",
    "claimType": "Motor",
    "reason": "Vehicle damaged in accident",
    "claimAmount": 55000,
    "approvedAmount": 50000,
    "status": "Approved",
    "remarks": "Claim approved after document verification.",
    "settlementDate": null
  },
  {
    "claimId": 3,
    "policyNumber": "POL10005",
    "customerId": 101,
    "claimDate": "2026-08-08T11:30:00",
    "claimType": "Health",
    "reason": "Hospitalization expenses",
    "claimAmount": 30000,
    "approvedAmount": null,
    "status": "Submitted",
    "remarks": null,
    "settlementDate": null
  }
]
```

If the customer has no claims:

```json
[]
```

---

# 4. Create / Submit Claim

### API Details

Property Value

---

Module Claim
Method `POST`
Endpoint `/api/Claims`
Full URL `https://localhost:<port>/api/Claims`
Content-Type `application/json`

### Purpose

Creates and submits a new claim.

A newly created claim is assigned the default status:

```text
Submitted
```

### Request Body

```json
{
  "policyNumber": "POL10001",
  "customerId": 101,
  "claimDate": "2026-08-09T10:00:00",
  "claimType": "Motor",
  "reason": "Vehicle damaged in accident",
  "claimAmount": 50000
}
```

### Request Fields

---

Field Type Required Description

---

`policyNumber` String Yes Policy number
associated with
the claim

`customerId` Integer Yes Customer
submitting the
claim

`claimDate` DateTime Yes Date/time of
claim

`claimType` String Yes Type of claim

`reason` String No Reason/details
for the claim

`claimAmount` Decimal Yes Amount being
claimed

---

### Postman

Select:

```text
Body → raw → JSON
```

Then provide the request body above.

### Sample Response

**HTTP 200 OK**

```json
{
  "claimId": 1,
  "message": "Claim submitted successfully."
}
```

> The exact response depends on the current `CreateClaimAsync`
> implementation. The stored procedure returns the newly generated ID
> using `LAST_INSERT_ID()`.

---

# 5. Update Claim

### API Details

Property Value

---

Module Claim
Method `PUT`
Endpoint `/api/Claims/{claimId}`
Full URL `https://localhost:<port>/api/Claims/1`
Content-Type `application/json`

### Purpose

Updates the editable information of an existing claim.

The update operation does not directly change the claim status. Status
changes are handled by the status, approve, and reject APIs.

### Path Parameter

Parameter Type Required Description

---

`claimId` Integer Yes Claim ID to update

### Request Body

```json
{
  "claimType": "Motor Accident",
  "reason": "Vehicle front and side damaged in accident",
  "claimAmount": 55000,
  "remarks": "Updated claim details after inspection"
}
```

### Request Fields

Field Type Required Description

---

`claimType` String Yes Updated claim type
`reason` String No Updated claim reason/details
`claimAmount` Decimal Yes Updated claim amount
`remarks` String No Additional remarks

### Postman

```text
PUT https://localhost:<port>/api/Claims/1
```

Select:

```text
Body → raw → JSON
```

### Sample Response

**HTTP 200 OK**

```json
{
  "message": "Claim updated successfully."
}
```

---

# 6. Change Claim Status

### API Details

Property Value

---

Module Claim
Method `PATCH`
Endpoint `/api/Claims/{claimId}/status`
Full URL `https://localhost:<port>/api/Claims/1/status`
Content-Type `application/json`

### Purpose

Changes the status of an existing claim.

Example statuses:

```text
Submitted
UnderReview
Approved
Rejected
Settled
```

### Path Parameter

Parameter Type Required Description

---

`claimId` Integer Yes Claim ID

### Request Body

```json
{
  "status": "UnderReview",
  "remarks": "Claim is currently under review."
}
```

### Request Fields

Field Type Required Description

---

`status` String Yes New claim status
`remarks` String No Reason/details for status change

### Postman

```text
PATCH https://localhost:<port>/api/Claims/1/status
```

### Sample Response

**HTTP 200 OK**

```json
{
  "message": "Claim status updated successfully."
}
```

---

# 7. Approve Claim

### API Details

Property Value

---

Module Claim
Method `PATCH`
Endpoint `/api/Claims/{claimId}/approve`
Full URL `https://localhost:<port>/api/Claims/1/approve`
Content-Type `application/json`

### Purpose

Approves a claim and stores the approved amount.

The claim status is automatically changed to:

```text
Approved
```

### Path Parameter

Parameter Type Required Description

---

`claimId` Integer Yes Claim ID

### Request Body

```json
{
  "approvedAmount": 50000,
  "remarks": "Claim approved after document verification."
}
```

### Request Fields

Field Type Required Description

---

`approvedAmount` Decimal Yes Amount approved for settlement
`remarks` String No Approval remarks

### Postman

```text
PATCH https://localhost:<port>/api/Claims/1/approve
```

### Sample Response

**HTTP 200 OK**

```json
{
  "message": "Claim approved successfully."
}
```

### Verify Approval

After approval, call:

```text
GET https://localhost:<port>/api/Claims/1
```

Expected claim values:

```json
{
  "claimId": 1,
  "claimAmount": 55000,
  "approvedAmount": 50000,
  "status": "Approved",
  "remarks": "Claim approved after document verification."
}
```

---

# 8. Reject Claim

### API Details

Property Value

---

Module Claim
Method `PATCH`
Endpoint `/api/Claims/{claimId}/reject`
Full URL `https://localhost:<port>/api/Claims/2/reject`
Content-Type `application/json`

### Purpose

Rejects a claim.

The claim status is automatically changed to:

```text
Rejected
```

The approved amount is cleared.

### Path Parameter

Parameter Type Required Description

---

`claimId` Integer Yes Claim ID

### Request Body

```json
{
  "remarks": "Required supporting documents were not provided."
}
```

### Request Fields

Field Type Required Description

---

`remarks` String Yes Reason for rejecting the claim

### Postman

```text
PATCH https://localhost:<port>/api/Claims/2/reject
```

### Sample Response

**HTTP 200 OK**

```json
{
  "message": "Claim rejected successfully."
}
```

### Verify Rejection

After rejection:

```text
GET https://localhost:<port>/api/Claims/2
```

Expected:

```json
{
  "claimId": 2,
  "status": "Rejected",
  "approvedAmount": null,
  "remarks": "Required supporting documents were not provided."
}
```

---

# Recommended Claims API Testing Flow

For complete end-to-end testing, use the following sequence.

## Successful Claim Flow

```text
1. Create Claim
       ↓
2. Get Claim By ID
       ↓
3. Get Customer Claims
       ↓
4. Update Claim
       ↓
5. Change Status → UnderReview
       ↓
6. Approve Claim
       ↓
7. Get Claim By ID
       ↓
8. Verify Status = Approved
```

## Rejected Claim Flow

Create another claim so that it can be tested independently:

```text
1. Create Claim
       ↓
2. Get Claim By ID
       ↓
3. Reject Claim
       ↓
4. Get Claim By ID
       ↓
5. Verify Status = Rejected
```

---

# Claims API Status Flow

A typical claim flow is:

```text
Submitted
    ↓
UnderReview
    ↓
   ┌───────────────┐
   ↓               ↓
Approved         Rejected
   ↓
Settled
```

---

# Stored Procedures Used

The Claims APIs use the following MySQL stored procedures:

API Operation Stored Procedure

---

Get All Claims `sp_claim_get_all`
Get Claim By ID `sp_claim_get_by_id`
Get Customer Claims `sp_claim_get_by_customer`
Create Claim `sp_claim_save`
Update Claim `sp_claim_update`
Change Claim Status `sp_claim_change_status`
Approve Claim `sp_claim_approve`
Reject Claim `sp_claim_reject`

---

# Postman Collection

The Claims APIs can be maintained in a Postman collection:

```text
Postman/
└── TFL-Insurance-Claims.postman_collection.json
```

Recommended collection structure:

```text
TFL Insurance - Claims
│
└── Claims
    ├── Get All Claims
    ├── Get Claim By ID
    ├── Get Customer Claims
    ├── Create Claim
    ├── Update Claim
    ├── Change Claim Status
    ├── Approve Claim
    └── Reject Claim
```

---

# Future Claims APIs

The following Claims functionality can be added later:

Module Method Description

---

Claim Documents POST Upload claim documents
Claim Documents GET Get claim documents

These are not included in the current API list because they have not
been implemented yet.

---

## Notes

- Replace `<port>` with the actual local API port.
- Use `Content-Type: application/json` for POST, PUT, and PATCH
  requests.
- GET requests do not require a request body.
- Use a separate claim when testing approval and rejection flows.
- After modifying a claim, use **Get Claim By ID** to verify the
  database changes.
