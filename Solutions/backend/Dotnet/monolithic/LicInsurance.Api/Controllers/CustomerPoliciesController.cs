using LicInsurance.Api.DTOs;
using LicInsurance.Api.Models;
using Microsoft.AspNetCore.Mvc;
using TFLInsurance.LicInsurance.Services.Interfaces;

namespace LicInsurance.Api.Controllers;

/// <summary>
/// Controller for managing Customer Policies
/// Handles CRUD operations and business logic for customer policies
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class CustomerPoliciesController : ControllerBase
{
    private readonly ILogger<CustomerPoliciesController> _logger;
    private readonly ICustomerPolicyService _customerPolicyService;

    public CustomerPoliciesController(ILogger<CustomerPoliciesController> logger, ICustomerPolicyService customerPolicyService)
    {
        _logger = logger;
        _customerPolicyService = customerPolicyService;
    }

    /// <summary>
    /// Get all customer policies
    /// </summary>
    /// <returns>List of all customer policies</returns>
    [HttpGet]
    public async Task<IActionResult> GetAllCustomerPolicies()
    {
        try
        {
            _logger.LogInformation("Controller: Fetching all customer policies");
            var policies = _customerPolicyService.GetAllCustomerPolicies();
            return Ok(policies);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Controller: Error fetching customer policies: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "Error fetching customer policies", error = ex.Message });
        }
    }

    /// <summary>
    /// Get customer policy by ID
    /// </summary>
    /// <param name="id">Customer Policy ID</param>
    /// <returns>Customer Policy details</returns>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCustomerPolicyById(int id)
    {
        try
        {
            _logger.LogInformation($"Controller: Fetching customer policy with ID: {id}");

            if (id <= 0)
                return BadRequest(new { message = "Invalid customer policy ID" });

            var policy = _customerPolicyService.GetCustomerPolicyById(id);

            if (policy == null)
                return NotFound(new { message = "Customer policy not found" });

            return Ok(policy);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Controller: Error fetching customer policy: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "Error fetching customer policy", error = ex.Message });
        }
    }

    /// <summary>
    /// Get all policies for a specific customer
    /// </summary>
    /// <param name="customerId">Customer ID</param>
    /// <returns>List of policies for the customer</returns>
    [HttpGet("customer/{customerId}")]
    public async Task<IActionResult> GetPoliciesByCustomerId(int customerId)
    {
        try
        {
            _logger.LogInformation($"Controller: Fetching policies for customer ID: {customerId}");

            if (customerId <= 0)
                return BadRequest(new { message = "Invalid customer ID" });

            var policies = _customerPolicyService.GetPoliciesByCustomerId(customerId);

            if (policies.Count == 0)
                return NotFound(new { message = "No policies found for this customer" });

            return Ok(policies);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Controller: Error fetching customer policies: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "Error fetching customer policies", error = ex.Message });
        }
    }

    /// <summary>
    /// Create a new customer policy
    /// </summary>
    /// <param name="dto">Customer policy data</param>
    /// <returns>Created customer policy</returns>
    [HttpPost]
    public async Task<IActionResult> CreateCustomerPolicy([FromBody] CreateUpdateCustomerPolicyDto dto)
    {
        try
        {
            _logger.LogInformation("Controller: Creating new customer policy");

            // Validation
            if (dto == null)
                return BadRequest(new { message = "Customer policy data is required" });

            if (dto.CustomerId <= 0)
                return BadRequest(new { message = "Invalid customer ID" });

            if (dto.PolicyId <= 0)
                return BadRequest(new { message = "Invalid policy ID" });

            if (dto.PremiumAmount < 0)
                return BadRequest(new { message = "Premium amount cannot be negative" });

            // Create the entity from DTO
            var customerPolicy = new CustomerPolicy
            {
                CustomerId = dto.CustomerId,
                PolicyId = dto.PolicyId,
                Status = dto.Status,
                PremiumAmount = dto.PremiumAmount,
                IsActive = dto.IsActive,
                CreatedDate = DateTime.UtcNow
            };

            int result = _customerPolicyService.CreateCustomerPolicy(customerPolicy);

            if (result > 0)
            {
                // Fetch the created policy
                var createdPolicy = _customerPolicyService.GetPoliciesByCustomerId(dto.CustomerId).LastOrDefault();
                return CreatedAtAction(nameof(GetCustomerPolicyById), 
                    new { id = createdPolicy?.CustomerPolicyId }, createdPolicy);
            }

            return BadRequest(new { message = "Failed to create customer policy" });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Controller: Error creating customer policy: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "Error creating customer policy", error = ex.Message });
        }
    }

    /// <summary>
    /// Update an existing customer policy
    /// </summary>
    /// <param name="id">Customer Policy ID</param>
    /// <param name="dto">Updated customer policy data</param>
    /// <returns>Updated customer policy</returns>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCustomerPolicy(int id, [FromBody] CreateUpdateCustomerPolicyDto dto)
    {
        try
        {
            _logger.LogInformation($"Controller: Updating customer policy with ID: {id}");

            if (id <= 0)
                return BadRequest(new { message = "Invalid customer policy ID" });

            if (dto == null)
                return BadRequest(new { message = "Customer policy data is required" });

            if (dto.CustomerId <= 0)
                return BadRequest(new { message = "Invalid customer ID" });

            if (dto.PolicyId <= 0)
                return BadRequest(new { message = "Invalid policy ID" });

            if (dto.PremiumAmount < 0)
                return BadRequest(new { message = "Premium amount cannot be negative" });

            // Check if policy exists
            var existingPolicy = _customerPolicyService.GetCustomerPolicyById(id);

            if (existingPolicy == null)
                return NotFound(new { message = "Customer policy not found" });

            // Update the policy with new data
            existingPolicy.CustomerId = dto.CustomerId;
            existingPolicy.PolicyId = dto.PolicyId;
            existingPolicy.Status = dto.Status;
            existingPolicy.PremiumAmount = dto.PremiumAmount;
            existingPolicy.IsActive = dto.IsActive;
            existingPolicy.ModifiedDate = DateTime.UtcNow;

            bool result = _customerPolicyService.UpdateCustomerPolicy(id, existingPolicy);

            if (result)
                return Ok(existingPolicy);

            return BadRequest(new { message = "Failed to update customer policy" });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Controller: Error updating customer policy: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "Error updating customer policy", error = ex.Message });
        }
    }

    /// <summary>
    /// Delete a customer policy
    /// </summary>
    /// <param name="id">Customer Policy ID</param>
    /// <returns>Success message</returns>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomerPolicy(int id)
    {
        try
        {
            _logger.LogInformation($"Controller: Deleting customer policy with ID: {id}");

            if (id <= 0)
                return BadRequest(new { message = "Invalid customer policy ID" });

            // Check if policy exists
            var policyExists = _customerPolicyService.GetCustomerPolicyById(id);

            if (policyExists == null)
                return NotFound(new { message = "Customer policy not found" });

            // Delete the policy from database
            int result = _customerPolicyService.DeleteCustomerPolicy(id);

            if (result > 0)
                return NoContent();

            return BadRequest(new { message = "Failed to delete customer policy" });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Controller: Error deleting customer policy: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "Error deleting customer policy", error = ex.Message });
        }
    }

    /// <summary>
    /// Get policies by status for a customer
    /// </summary>
    /// <param name="customerId">Customer ID</param>
    /// <param name="status">Policy status (e.g., Active, Inactive, Expired)</param>
    /// <returns>List of policies matching the status</returns>
    [HttpGet("customer/{customerId}/status/{status}")]
    public async Task<IActionResult> GetCustomerPoliciesByStatus(int customerId, string status)
    {
        try
        {
            _logger.LogInformation($"Controller: Fetching policies for customer ID: {customerId} with status: {status}");

            if (customerId <= 0)
                return BadRequest(new { message = "Invalid customer ID" });

            if (string.IsNullOrWhiteSpace(status))
                return BadRequest(new { message = "Status is required" });

            var policies = _customerPolicyService.GetCustomerPoliciesByStatus(customerId, status);

            return Ok(policies);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Controller: Error fetching customer policies by status: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "Error fetching customer policies", error = ex.Message });
        }
    }

    /// <summary>
    /// Renew a customer policy
    /// </summary>
    /// <param name="id">Customer Policy ID</param>
    /// <returns>Renewed customer policy</returns>
    [HttpPost("{id}/renew")]
    public async Task<IActionResult> RenewCustomerPolicy(int id)
    {
        try
        {
            _logger.LogInformation($"Controller: Renewing customer policy with ID: {id}");

            if (id <= 0)
                return BadRequest(new { message = "Invalid customer policy ID" });

            var policy = _customerPolicyService.RenewCustomerPolicy(id);

            if (policy == null)
                return NotFound(new { message = "Customer policy not found" });

            return Ok(policy);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Controller: Error renewing customer policy: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "Error renewing customer policy", error = ex.Message });
        }
    }
}
