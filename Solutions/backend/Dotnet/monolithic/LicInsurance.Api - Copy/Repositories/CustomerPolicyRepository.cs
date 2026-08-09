using LicInsurance.Api.Models;
using LicInsurance.Api.Data.Constant;
using LicInsurance.Api.Repositories.Dapper;
using TFLInsurance.LicInsurance.Repositories.Interfaces;

namespace TFLInsurance.LicInsurance.Repositories;

/// <summary>
/// Repository implementation for Customer Policy operations using Dapper ORM
/// Implements CRUD and business operations for customer policies
/// </summary>
public class CustomerPolicyRepository : ICustomerPolicyRepository
{
    private readonly IDapperfactory _dapper;

    public CustomerPolicyRepository(IDapperfactory dapper)
    {
        _dapper = dapper;
    }

    /// <summary>
    /// Get all customer policies
    /// </summary>
    public List<CustomerPolicy> GetAllCustomerPolicies()
    {
        return _dapper.Query<CustomerPolicy>(
            CustomerPoliciesStoredProcedure.CUSTOMER_POLICY_GET_ALL)
            .ToList();
    }

    /// <summary>
    /// Get customer policy by ID
    /// </summary>
    public CustomerPolicy? GetCustomerPolicyById(int id)
    {
        return _dapper.QueryFirstOrDefault<CustomerPolicy>(
            CustomerPoliciesStoredProcedure.CUSTOMER_POLICY_GET_BY_ID,
            new
            {
                CustomerPolicyId = id
            });
    }

    /// <summary>
    /// Get all policies for a specific customer
    /// </summary>
    public List<CustomerPolicy> GetPoliciesByCustomerId(int customerId)
    {
        return _dapper.Query<CustomerPolicy>(
            CustomerPoliciesStoredProcedure.CUSTOMER_POLICY_GET_BY_CUSTOMER_ID,
            new
            {
                CustomerId = customerId
            }).ToList();
    }

    /// <summary>
    /// Get policies by customer ID and status
    /// </summary>
    public List<CustomerPolicy> GetCustomerPoliciesByStatus(int customerId, string status)
    {
        return _dapper.Query<CustomerPolicy>(
            CustomerPoliciesStoredProcedure.CUSTOMER_POLICY_GET_BY_CUSTOMER_AND_STATUS,
            new
            {
                CustomerId = customerId,
                Status = status
            }).ToList();
    }

    /// <summary>
    /// Create a new customer policy
    /// </summary>
    public int CreateCustomerPolicy(CustomerPolicy customerPolicy)
    {
        return _dapper.Execute(
            CustomerPoliciesStoredProcedure.CUSTOMER_POLICY_SAVE,
            new
            {
                customerPolicy.CustomerId,
                customerPolicy.PolicyId,
                customerPolicy.PurchaseDate,
                customerPolicy.ExpiryDate,
                customerPolicy.Status,
                customerPolicy.PremiumAmount,
                customerPolicy.PaymentFrequency,
                customerPolicy.LastPaymentDate,
                customerPolicy.NextPaymentDueDate,
                customerPolicy.Remarks,
                customerPolicy.IsActive,
                customerPolicy.CreatedDate
            });
    }

    /// <summary>
    /// Update an existing customer policy
    /// </summary>
    public bool UpdateCustomerPolicy(int id, CustomerPolicy customerPolicy)
    {
        int result = _dapper.Execute(
            CustomerPoliciesStoredProcedure.CUSTOMER_POLICY_UPDATE,
            new
            {
                CustomerPolicyId = id,
                customerPolicy.CustomerId,
                customerPolicy.PolicyId,
                customerPolicy.PurchaseDate,
                customerPolicy.ExpiryDate,
                customerPolicy.Status,
                customerPolicy.PremiumAmount,
                customerPolicy.PaymentFrequency,
                customerPolicy.LastPaymentDate,
                customerPolicy.NextPaymentDueDate,
                customerPolicy.Remarks,
                customerPolicy.IsActive,
                ModifiedDate = DateTime.UtcNow
            });

        return result > 0;
    }

    /// <summary>
    /// Delete a customer policy
    /// </summary>
    public int DeleteCustomerPolicy(int id)
    {
        return _dapper.Execute(
            CustomerPoliciesStoredProcedure.CUSTOMER_POLICY_DELETE,
            new
            {
                CustomerPolicyId = id
            });
    }

    /// <summary>
    /// Renew a customer policy
    /// Updates status to Active and extends expiry date
    /// </summary>
    public CustomerPolicy? RenewCustomerPolicy(int id)
    {
        return _dapper.QueryFirstOrDefault<CustomerPolicy>(
            CustomerPoliciesStoredProcedure.CUSTOMER_POLICY_RENEW,
            new
            {
                CustomerPolicyId = id,
                RenewalPeriodInMonths = 12
            });
    }
}
