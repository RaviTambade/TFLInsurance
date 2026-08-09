using LicInsurance.Api.Models;

namespace TFLInsurance.LicInsurance.Repositories.Interfaces;

/// <summary>
/// Repository interface for Customer Policy operations
/// Defines operations for managing customer policies
/// </summary>
public interface ICustomerPolicyRepository
{
    /// <summary>
    /// Get all customer policies
    /// </summary>
    /// <returns>List of all customer policies</returns>
    List<CustomerPolicy> GetAllCustomerPolicies();

    /// <summary>
    /// Get customer policy by ID
    /// </summary>
    /// <param name="id">Customer Policy ID</param>
    /// <returns>Customer policy or null if not found</returns>
    CustomerPolicy? GetCustomerPolicyById(int id);

    /// <summary>
    /// Get all policies for a specific customer
    /// </summary>
    /// <param name="customerId">Customer ID</param>
    /// <returns>List of policies for the customer</returns>
    List<CustomerPolicy> GetPoliciesByCustomerId(int customerId);

    /// <summary>
    /// Get policies by customer ID and status
    /// </summary>
    /// <param name="customerId">Customer ID</param>
    /// <param name="status">Policy status</param>
    /// <returns>List of policies matching customer and status</returns>
    List<CustomerPolicy> GetCustomerPoliciesByStatus(int customerId, string status);

    /// <summary>
    /// Create a new customer policy
    /// </summary>
    /// <param name="customerPolicy">Customer policy to create</param>
    /// <returns>Number of rows affected</returns>
    int CreateCustomerPolicy(CustomerPolicy customerPolicy);

    /// <summary>
    /// Update an existing customer policy
    /// </summary>
    /// <param name="id">Customer Policy ID to update</param>
    /// <param name="customerPolicy">Updated customer policy data</param>
    /// <returns>True if update was successful</returns>
    bool UpdateCustomerPolicy(int id, CustomerPolicy customerPolicy);

    /// <summary>
    /// Delete a customer policy
    /// </summary>
    /// <param name="id">Customer Policy ID to delete</param>
    /// <returns>Number of rows affected</returns>
    int DeleteCustomerPolicy(int id);

    /// <summary>
    /// Renew a customer policy
    /// Updates status to Active and extends expiry date
    /// </summary>
    /// <param name="id">Customer Policy ID to renew</param>
    /// <returns>Updated customer policy or null if not found</returns>
    CustomerPolicy? RenewCustomerPolicy(int id);
}
