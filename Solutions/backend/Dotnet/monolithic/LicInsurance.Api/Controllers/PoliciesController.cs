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

    [HttpGet]
    [Route("get")]
    public IActionResult Get()
    {
        _logger.LogInformation("Fetching policies.");
        return Ok(new[]
        {
            new
            {
                PolicyId = 1,
                PolicyNumber = "PN001",
                PolicyType = "Life"
            },
            new
            {
                PolicyId = 2,
                PolicyNumber = "PN002",
                PolicyType = "Health"
            }
        });
    }

    [HttpGet]
    [Route("getall")]
    public IActionResult GetAllCustomerPolicies()
    {
        _logger.LogInformation("Fetching all policies from service.");

        try
        {
            var policies = _policyService.GetAll(); 
            return Ok(policies);

        }
        catch (Exception ex)
        {
            _logger.LogError("Error occurred while fetching all policies." + ex.Message);
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    
    [HttpGet("{id:int}")]
    public IActionResult GetCustomerPolicyById(int id)
    {
        _logger.LogInformation("Getting policy by ID.");
        try
        {
            var policies = _policyService.GetById(id);
            return Ok(policies);

        }
        catch (Exception ex)
        {
            _logger.LogError("Error occurred while fetching policy by ID." + ex.Message);
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    // /// <summary>
    // /// Get all policies for a specific customer
    // /// </summary>
    // /// <param name="customerId">Customer ID</param>
    // /// <returns>List of policies for the customer</returns>
    // [HttpGet("customer/{customerId}")]
    // public async Task<IActionResult> GetPoliciesByCustomerId(int customerId)
    // {
    //     try
    //     {
    //         _logger.LogInformation($"Controller: Fetching policies for customer ID: {customerId}");

    //         if (customerId <= 0)
    //             return BadRequest(new { message = "Invalid customer ID" });

    //         var policies = _customerPolicyService.GetPoliciesByCustomerId(customerId);

    //         if (policies.Count == 0)
    //             return NotFound(new { message = "No policies found for this customer" });

    //         return Ok(policies);
    //     }
    //     catch (Exception ex)
    //     {
    //         _logger.LogError($"Controller: Error fetching customer policies: {ex.Message}");
    //         return StatusCode(StatusCodes.Status500InternalServerError, 
    //             new { message = "Error fetching customer policies", error = ex.Message });
    //     }
    // }


    [HttpPost]
    public IActionResult CreateCustomerPolicy([FromBody] Policy policyDto)
    {
        _logger.LogInformation("Creating new policy.");
        try
        {
            var policies = _policyService.Save(policyDto);
            return Ok(policies);
        }
        catch (Exception ex)
        {
            _logger.LogError("Error occurred while creating policy." + ex.Message);
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    [HttpPut("{id:int}")]
    public IActionResult UpdateCustomerPolicy(int id, [FromBody] Policy policyDto)
    {
        _logger.LogInformation("Updating policy.");
        try
        {
            var _isupdate = _policyService.Update(id,policyDto);
            return Ok(_isupdate);

        }
        catch (Exception ex)
        {
            _logger.LogError("Error occurred while creating policy." + ex.Message);
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeleteCustomerPolicy(int id)
    {
        _logger.LogInformation("Deleting policy.");

        return NoContent();
    }
}