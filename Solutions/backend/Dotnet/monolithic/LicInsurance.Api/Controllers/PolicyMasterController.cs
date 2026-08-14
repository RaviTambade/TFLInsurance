using Microsoft.AspNetCore.Mvc;
using TFLInsurance.LicInsurance.Services.Interfaces;
using LicInsurance.Api.Models.PolicyMaster;

namespace LicInsurance.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PolicyMasterController : ControllerBase
{
    private readonly IPolicyMasterService _policyMasterService;
    private readonly ILogger<PolicyMasterController> _logger;

    public PolicyMasterController(
        IPolicyMasterService policyMasterService,
        ILogger<PolicyMasterController> logger)
    {
        _policyMasterService = policyMasterService;
        _logger = logger;
    }

    /// <summary>
    /// Get all policy types from the policy master configuration
    /// </summary>
    /// <returns>PolicyMasterDto containing all policy types</returns>
    [HttpGet]
    [Route("get-all")]
    public async Task<IActionResult> GetPolicyMaster()
    {
        try
        {
            _logger.LogInformation("Fetching policy master data.");
            var policyMaster = await _policyMasterService.GetPolicyMasterAsync();
            return Ok(policyMaster);
        }
        catch (FileNotFoundException ex)
        {
            _logger.LogError($"Configuration file not found: {ex.Message}");
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error fetching policy master: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "An error occurred while fetching policy master data." });
        }
    }

    /// <summary>
    /// Get a specific policy type by name
    /// </summary>
    /// <param name="policyType">The policy type name</param>
    /// <returns>PolicyTypeDto if found, otherwise null</returns>
    [HttpGet]
    [Route("get-by-type/{policyType}")]
    public async Task<IActionResult> GetPolicyType(string policyType)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(policyType))
                return BadRequest(new { message = "Policy type cannot be empty." });

            _logger.LogInformation($"Fetching policy type: {policyType}");
            var policyType_dto = await _policyMasterService.GetPolicyTypeAsync(policyType);

            if (policyType_dto == null)
                return NotFound(new { message = $"Policy type '{policyType}' not found." });

            return Ok(policyType_dto);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning($"Invalid argument: {ex.Message}");
            return BadRequest(new { message = ex.Message });
        }
        catch (FileNotFoundException ex)
        {
            _logger.LogError($"Configuration file not found: {ex.Message}");
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error fetching policy type: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching policy type data." });
        }
    }
}
