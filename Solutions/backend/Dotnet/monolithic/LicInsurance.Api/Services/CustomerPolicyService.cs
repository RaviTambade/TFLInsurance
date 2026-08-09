using LicInsurance.Api.Models;
using TFLInsurance.LicInsurance.Services.Interfaces;
using TFLInsurance.LicInsurance.Repositories.Interfaces;

namespace TFLInsurance.LicInsurance.Services;

/// <summary>
/// Service implementation for Customer Policy operations
/// Contains business logic and delegates to repository for data operations
/// </summary>
public class CustomerPolicyService : ICustomerPolicyService
{
    private readonly ICustomerPolicyRepository _repository;
    private readonly ILogger<CustomerPolicyService> _logger;

    public CustomerPolicyService(ICustomerPolicyRepository repository, ILogger<CustomerPolicyService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    /// <summary>
    /// Get all customer policies
    /// </summary>
    public List<CustomerPolicy> GetAllCustomerPolicies()
    {
        _logger.LogInformation("Service: Fetching all customer policies");
        try
        {
            return _repository.GetAllCustomerPolicies();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Service: Error fetching all customer policies: {ex.Message}");
            throw;
        }
    }

    /// <summary>
    /// Get customer policy by ID
    /// </summary>
    public CustomerPolicy? GetCustomerPolicyById(int id)
    {
        _logger.LogInformation($"Service: Fetching customer policy with ID: {id}");
        try
        {
            if (id <= 0)
                throw new ArgumentException("Customer Policy ID must be greater than 0", nameof(id));

            return _repository.GetCustomerPolicyById(id);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Service: Error fetching customer policy: {ex.Message}");
            throw;
        }
    }

    /// <summary>
    /// Get all policies for a specific customer
    /// </summary>
    public List<CustomerPolicy> GetPoliciesByCustomerId(int customerId)
    {
        _logger.LogInformation($"Service: Fetching policies for customer ID: {customerId}");
        try
        {
            if (customerId <= 0)
                throw new ArgumentException("Customer ID must be greater than 0", nameof(customerId));

            return _repository.GetPoliciesByCustomerId(customerId);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Service: Error fetching policies by customer ID: {ex.Message}");
            throw;
        }
    }

    /// <summary>
    /// Get policies by customer ID and status
    /// </summary>
    public List<CustomerPolicy> GetCustomerPoliciesByStatus(int customerId, string status)
    {
        _logger.LogInformation($"Service: Fetching policies for customer {customerId} with status {status}");
        try
        {
            if (customerId <= 0)
                throw new ArgumentException("Customer ID must be greater than 0", nameof(customerId));

            if (string.IsNullOrWhiteSpace(status))
                throw new ArgumentException("Status cannot be null or empty", nameof(status));

            return _repository.GetCustomerPoliciesByStatus(customerId, status);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Service: Error fetching policies by customer and status: {ex.Message}");
            throw;
        }
    }

    /// <summary>
    /// Create a new customer policy
    /// </summary>
    public int CreateCustomerPolicy(CustomerPolicy customerPolicy)
    {
        _logger.LogInformation("Service: Creating new customer policy");
        try
        {
            if (customerPolicy == null)
                throw new ArgumentNullException(nameof(customerPolicy), "Customer policy cannot be null");

            if (customerPolicy.CustomerId <= 0)
                throw new ArgumentException("Customer ID must be greater than 0", nameof(customerPolicy.CustomerId));

            if (customerPolicy.PolicyId <= 0)
                throw new ArgumentException("Policy ID must be greater than 0", nameof(customerPolicy.PolicyId));

            if (customerPolicy.PremiumAmount < 0)
                throw new ArgumentException("Premium amount cannot be negative", nameof(customerPolicy.PremiumAmount));

            customerPolicy.CreatedDate = DateTime.UtcNow;
            return _repository.CreateCustomerPolicy(customerPolicy);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Service: Error creating customer policy: {ex.Message}");
            throw;
        }
    }

    /// <summary>
    /// Update an existing customer policy
    /// </summary>
    public bool UpdateCustomerPolicy(int id, CustomerPolicy customerPolicy)
    {
        _logger.LogInformation($"Service: Updating customer policy with ID: {id}");
        try
        {
            if (id <= 0)
                throw new ArgumentException("Customer Policy ID must be greater than 0", nameof(id));

            if (customerPolicy == null)
                throw new ArgumentNullException(nameof(customerPolicy), "Customer policy cannot be null");

            if (customerPolicy.CustomerId <= 0)
                throw new ArgumentException("Customer ID must be greater than 0", nameof(customerPolicy.CustomerId));

            if (customerPolicy.PolicyId <= 0)
                throw new ArgumentException("Policy ID must be greater than 0", nameof(customerPolicy.PolicyId));

            if (customerPolicy.PremiumAmount < 0)
                throw new ArgumentException("Premium amount cannot be negative", nameof(customerPolicy.PremiumAmount));

            customerPolicy.ModifiedDate = DateTime.UtcNow;
            return _repository.UpdateCustomerPolicy(id, customerPolicy);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Service: Error updating customer policy: {ex.Message}");
            throw;
        }
    }

    /// <summary>
    /// Delete a customer policy
    /// </summary>
    public int DeleteCustomerPolicy(int id)
    {
        _logger.LogInformation($"Service: Deleting customer policy with ID: {id}");
        try
        {
            if (id <= 0)
                throw new ArgumentException("Customer Policy ID must be greater than 0", nameof(id));

            return _repository.DeleteCustomerPolicy(id);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Service: Error deleting customer policy: {ex.Message}");
            throw;
        }
    }

    /// <summary>
    /// Renew a customer policy
    /// </summary>
    public CustomerPolicy? RenewCustomerPolicy(int id)
    {
        _logger.LogInformation($"Service: Renewing customer policy with ID: {id}");
        try
        {
            if (id <= 0)
                throw new ArgumentException("Customer Policy ID must be greater than 0", nameof(id));

            return _repository.RenewCustomerPolicy(id);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Service: Error renewing customer policy: {ex.Message}");
            throw;
        }
    }
}
