using Microsoft.AspNetCore.Mvc;
using LicInsurance.Api.DTOs;
using TFLInsurance.LicInsurance.Services.Interfaces;

namespace LicInsurance.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PoliciesController : ControllerBase
{
    private readonly IPolicyService _policyService;

    public PoliciesController(IPolicyService policyService)
    {
        _policyService = policyService;
    }

    [HttpGet]
    [Route("get")]
    public IActionResult Get()
    {
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
        var policies = _policyService.GetAll();
        return Ok(policies);
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        return Ok();
    }

    [HttpPost]
    public IActionResult Create([FromBody] PolicyDto dto)
    {
        return CreatedAtAction(nameof(GetById), new { id = 1 }, dto);
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] PolicyDto dto)
    {
        return Ok(dto);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        return NoContent();
    }
}