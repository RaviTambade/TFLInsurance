# Master API Endpoints Documentation

> Combined reference from all three API documentation files.

---

## Quick Reference Table — All Endpoints

| # | Method | Endpoint | Description | Source |
|---|--------|----------|-------------|--------|
| 1 | POST | `/api/auth/login` | users Login | User API |
| 2 | POST | `/api/customers/register` | Register customer | customer API |
| 3 | GET | `/api/users/customerProfileByUserId/${userId}` | Get customer profile by userid | user API |
| 4 | POST | `/api/policies/addPolicy/${customerId}` | purchase policy | policy API |
| 5 | PUT | `/api/customers/editProfilebyUserId/${userId}` | edit cutomer profile | customer API |
| 6 | GET | `/api/policies/getPolicyByCustomerId/${customerId}` | Get policy list for customer | policy API |
| 7 | POST | `/api/premiums` | pay premium | premium API |
| 8 | GET | `/api/customers/getAllCustomers` | Get All customers list | customer API |
| 9 | GET | `/api/policies/getAllPolicies` | Get all policies | policies API |
| 10 | GET | `/api/users/getAllUsers` | Get all user list | User API |
| 11 | PUT | `/api/users/resetPassword/${selectedUser.UserId}` | reset password | users API |
| 12 | PATCH | `/api/users/createUser` | create user by admin | users API |
| 13 | PUT | `/api/users/updateRole/${selectedUser.UserId}` | assign role by admin | users API |
| 14 | GET | `/api/users/getUser/${user.UserId}` | view perticuler user details | user API |