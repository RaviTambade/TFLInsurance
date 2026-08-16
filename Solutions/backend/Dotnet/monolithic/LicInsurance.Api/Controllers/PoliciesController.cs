using Microsoft.AspNetCore.Mvc;
using TFLInsurance.LicInsurance.Services.Interfaces;
using LicInsurance.Api.Models;

namespace LicInsurance.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PoliciesController : ControllerBase
{
    private readonly IPolicyService _policyService;
    private readonly ILogger<PoliciesController> _logger;

    public PoliciesController(IPolicyService policyService, ILogger<PoliciesController> logger)
    {
        _policyService = policyService;
        _logger = logger;
    }

    /// <summary>
    /// Get all policies
    /// </summary>
    /// <returns>List of all policies</returns>
    [HttpGet]
    public IActionResult GetAllPolicies()
    {
        _logger.LogInformation("Fetching all policies.");
        try
        {
            var policies = _policyService.GetAll();
            return Ok(policies);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error occurred while fetching all policies. {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching policies." });
        }
    }

    /// <summary>
    /// Get policy by ID
    /// </summary>
    /// <param name="policyId">Policy ID</param>
    /// <returns>Policy details</returns>
    [HttpGet("{policyId:int}")]
    public IActionResult GetPolicyById(int policyId)
    {
        _logger.LogInformation($"Getting policy by ID: {policyId}");
        try
        {
            if (policyId <= 0)
                return BadRequest(new { message = "Invalid policy ID." });

            var policy = _policyService.GetById(policyId);
            if (policy == null)
                return NotFound(new { message = $"Policy with ID {policyId} not found." });

            return Ok(policy);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning($"Invalid argument: {ex.Message}");
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error occurred while fetching policy by ID. {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the policy." });
        }
    }

    /// <summary>
    /// Get all policies for a specific customer
    /// </summary>
    /// <param name="customerId">Customer ID</param>
    /// <returns>List of policies for the customer</returns>
    [HttpGet("customer/{customerId:int}")]
    public IActionResult GetPoliciesByCustomerId(int customerId)
    {
        _logger.LogInformation($"Fetching policies for customer ID: {customerId}");
        try
        {
            if (customerId <= 0)
                return BadRequest(new { message = "Invalid customer ID." });

            var policies = _policyService.GetPoliciesByCustomerId(customerId);
            if (policies == null || policies.Count == 0)
                return NotFound(new { message = $"No policies found for customer ID {customerId}." });

            return Ok(policies);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning($"Invalid argument: {ex.Message}");
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error occurred while fetching policies by customer ID. {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching customer policies." });
        }
    }

    /// <summary>
    /// Get all policies for a specific agent
    /// </summary>
    /// <param name="agentId">Agent ID</param>
    /// <returns>List of policies assigned to the agent</returns>
    [HttpGet("agent/{agentId:int}")]
    public IActionResult GetPoliciesByAgentId(int agentId)
    {
        _logger.LogInformation($"Fetching policies for agent ID: {agentId}");
        try
        {
            if (agentId <= 0)
                return BadRequest(new { message = "Invalid agent ID." });

            var policies = _policyService.GetPoliciesByAgentId(agentId);
            if (policies == null || policies.Count == 0)
                return NotFound(new { message = $"No policies found for agent ID {agentId}." });

            return Ok(policies);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning($"Invalid argument: {ex.Message}");
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error occurred while fetching policies by agent ID. {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching agent policies." });
        }
    }

    /// <summary>
    /// Create a new customer policy with validation
    /// </summary>
    /// <param name="policyDto">Policy object</param>
    /// <returns>ID of the created policy</returns>
    [HttpPost]
    public IActionResult CreatePolicy([FromBody] Policy policyDto)
    {
        _logger.LogInformation("Creating new policy.");
        try
        {
            if (policyDto == null)
                return BadRequest(new { message = "Policy data is required." });

            var policyId = _policyService.CreatePolicy(policyDto);
            return CreatedAtAction(nameof(GetPolicyById), new { policyId = policyId },
                new { message = "Policy created successfully", policyId = policyId, policyNumber = policyDto.PolicyNumber });
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning($"Invalid policy data: {ex.Message}");
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error occurred while creating policy. {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while creating the policy." });
        }
    }

    /// <summary>
    /// Update an existing policy
    /// </summary>
    /// <param name="policyId">Policy ID to update</param>
    /// <param name="policyDto">Updated policy object</param>
    /// <returns>Success or failure message</returns>
    [HttpPut("{policyId:int}")]
    public IActionResult UpdatePolicy(int policyId, [FromBody] Policy policyDto)
    {
        _logger.LogInformation($"Updating policy ID: {policyId}");
        try
        {
            if (policyId <= 0)
                return BadRequest(new { message = "Invalid policy ID." });

            if (policyDto == null)
                return BadRequest(new { message = "Policy data is required." });

            var success = _policyService.UpdatePolicy(policyId, policyDto);
            if (!success)
                return NotFound(new { message = $"Policy with ID {policyId} not found or could not be updated." });

            return Ok(new { message = "Policy updated successfully." });
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning($"Invalid policy data: {ex.Message}");
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error occurred while updating policy. {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while updating the policy." });
        }
    }

    /// <summary>
    /// Renew an existing policy
    /// </summary>
    /// <param name="policyId">Policy ID to renew</param>
    /// <returns>Success or failure message</returns>
    [HttpPut("{policyId:int}/renew")]
    public IActionResult RenewPolicy(int policyId)
    {
        _logger.LogInformation($"Renewing policy ID: {policyId}");
        try
        {
            if (policyId <= 0)
                return BadRequest(new { message = "Invalid policy ID." });

            var success = _policyService.RenewPolicy(policyId);
            if (!success)
                return NotFound(new { message = $"Policy with ID {policyId} not found or could not be renewed." });

            return Ok(new { message = "Policy renewed successfully." });
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning($"Invalid argument: {ex.Message}");
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error occurred while renewing policy. {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while renewing the policy." });
        }
    }

    /// <summary>
    /// Delete a policy
    /// </summary>
    /// <param name="policyId">Policy ID to delete</param>
    /// <returns>No content on success</returns>
    [HttpDelete("{policyId:int}")]
    public IActionResult DeletePolicy(int policyId)
    {
        _logger.LogInformation($"Deleting policy ID: {policyId}");
        try
        {
            if (policyId <= 0)
                return BadRequest(new { message = "Invalid policy ID." });

            var result = _policyService.DeletePolicy(policyId);
            if (result <= 0)
                return NotFound(new { message = $"Policy with ID {policyId} not found." });

            return NoContent();
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning($"Invalid argument: {ex.Message}");
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error occurred while deleting policy. {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while deleting the policy." });
        }
    }
}
