using Microsoft.AspNetCore.Mvc;
using LicInsurance.Api.Services;
using LicInsurance.Api.Models;
using LicInsurance.Api.Entities;

namespace LicInsurance.Api.Controllers
{


[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;


    public UsersController(IUserService userService) 
    { 
            _userService = userService;
    }



    [HttpPost("authenticate")]
    public IActionResult Authenticate(AuthenticateRequest model)
    {
        var response = _userService.Authenticate(model);
        if (response == null) return BadRequest(new { message = "Username or password is incorrect" });
        return Ok(response);
    }



    [Authorize(Role = Role.Admin)]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_userService.GetAll());
    }
}
}