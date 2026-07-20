using Microsoft.AspNetCore.Mvc;
using LicInsurance.Api.DTOs;

namespace LicInsurance.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PoliciesController : ControllerBase
{
    [HttpGet]
    [Route("get")]
    public IActionResult Get()
    {
        return Ok(new[]
        {
            new
            {
                PolicyId = 1,
                PolicyName = "Jeevan Anand",
                PolicyType = "Life"
            },
            new
            {
                PolicyId = 2,
                PolicyName = "Health Suraksha",
                PolicyType = "Health"
            }
        });
    }

    [HttpGet]
    [Route("getall")]
    public IActionResult GetAll()
    {
        return Ok();
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