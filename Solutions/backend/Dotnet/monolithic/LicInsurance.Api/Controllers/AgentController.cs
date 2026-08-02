using Microsoft.AspNetCore.Mvc;
using LicInsurance.Api.DTOs;

namespace LicInsurance.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AgentsController : ControllerBase
{
    [HttpGet]
    [Route("GetAgent")]
    public IActionResult GetAgent()
    {
        return Ok(new[]
        {
            new
            {
                AgentId = 1,
                AgentName = "Agent1",
                
            },
            new
            {
              AgentId = 2,
                AgentName = "Agent2",
            }
        });
    }

    [HttpGet]
    [Route("GetAllAgents")]
    public IActionResult GetAllAgents()
    {
        return Ok();
    }

    [HttpGet("{id:int}")]
    public IActionResult GetAgentById(int id)
    {
        return Ok();
    }

    [HttpPost]
    public IActionResult CreateAgent([FromBody] PolicyDto dto)
    {
        return CreatedAtAction(nameof(GetAgentById), new { id = 1 }, dto);
    }

    [HttpPut("{id:int}")]
    public IActionResult UpdateAgent(int id, [FromBody] PolicyDto dto)
    {
        return Ok(dto);
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeleteAgent(int id)
    {
        return NoContent();
    }
}