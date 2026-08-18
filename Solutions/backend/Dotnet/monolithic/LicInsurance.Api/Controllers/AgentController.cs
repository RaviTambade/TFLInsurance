using LicInsurance.Api.DTOs;
using LicInsurance.Api.Models;
using Microsoft.AspNetCore.Mvc;


using TFLInsurance.LicInsurance.Services.Interfaces;

namespace LicInsurance.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AgentsController : ControllerBase
{
    private readonly IAgentsService _agentsService;

    public AgentsController(IAgentsService agentsService)
    {
            _agentsService = agentsService;
    }
    
    [HttpGet]
    [Route("getall")]
    public IActionResult GetAll()
    {
       var agents = _agentsService.GetAll(); 
            return Ok(agents);
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
         var agents = _agentsService.GetById(id);
            return Ok(agents);
    }

    [HttpPost]
    public IActionResult Create([FromBody] Agents dto)
    {
        var policies = _agentsService.Save(dto);
            return Ok(policies);
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] AgentsDto dto)
    {
        return Ok(dto);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        return NoContent();
    }
//test add
}