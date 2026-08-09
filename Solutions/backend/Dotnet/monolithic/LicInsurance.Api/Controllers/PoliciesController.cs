using Microsoft.AspNetCore.Mvc;
using LicInsurance.Api.DTOs;
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
    public IActionResult GetAll()
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
    public IActionResult GetById(int id)
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

    [HttpPost]
    public IActionResult Create([FromBody] Policy policyDto)
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
    public IActionResult Update(int id, [FromBody] Policy policyDto)
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
    public IActionResult Delete(int id)
    {
        _logger.LogInformation("Deleting policy.");

        return NoContent();
    }
}