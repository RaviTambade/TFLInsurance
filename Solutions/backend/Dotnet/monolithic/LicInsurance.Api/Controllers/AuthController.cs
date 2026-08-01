using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
 
using LicInsurance.Api.Models; 
using LicInsurance.Api.Data; 


namespace   LicInsurance.Api.Controllers;
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  
    // Fake user store (replace with DB)
    private static readonly Dictionary<string, string> Users = new();


    //====================================================
    // POST : api/auth/login
    //====================================================

    [HttpPost("login")]
    public IActionResult Login(LoginRequest request)
    {
        var user = StaticData.Users.FirstOrDefault(x =>
            x.Username.Equals(request.Username,
            StringComparison.OrdinalIgnoreCase)
            &&
            x.Password == request.Password);

        if (user == null)
        {
            return Unauthorized(new
            {
                success = false,
                message = "Invalid username or password."
            });
        }

        return Ok(new
        {
            success = true,
            token = "sample-jwt-token",
            user = new
            {
                user.Id,
                Name = $"{user.FirstName} {user.LastName}",
                user.Username,
                user.Role,
                user.Email
            }
        });
    }

    
    //====================================================
    // POST : api/auth/register
    //====================================================

    [HttpPost("register")]
    public IActionResult Register(RegisterRequest request)
    {

        if (StaticData.Users.Any(x =>
            x.Username.Equals(request.Username,
            StringComparison.OrdinalIgnoreCase)))
        {
            return BadRequest(new
            {
                success = false,
                message = "Username already exists."
            });
        }

        var user = new User
        {
            Id = StaticData.Users.Max(x => x.Id) + 1,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Username = request.Username,
            Password = request.Password,
            Email = request.Email,
            MobileNumber = request.MobileNumber,
            Role = "Customer"
        };

        StaticData.Users.Add(user);

        return Ok(new
        {
            success = true,
            message = "Registration successful.",
            userId = user.Id
        });
    }

    //====================================================
    // POST : api/auth/logout
    //====================================================

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        return Ok(new
        {
            success = true,
            message = "Logout successful."
        });
    }

    //====================================================
    // GET : api/auth/profile?username=customer1
    //====================================================

    [HttpGet("profile")]
    public IActionResult Profile(string username)
    {

        var user = StaticData.Users.FirstOrDefault(x =>
            x.Username.Equals(username,
            StringComparison.OrdinalIgnoreCase));

        if (user == null)
        {
            return NotFound(new
            {
                success = false,
                message = "User not found."
            });
        }

        return Ok(new
        {
            success = true,
            data = user
        });
    }

    //====================================================
    // PUT : api/auth/change-password
    //====================================================

    [HttpPut("change-password")]
    public IActionResult ChangePassword(ChangePasswordRequest request)
    {
        var user = StaticData.Users.FirstOrDefault(x =>
            x.Username.Equals(request.Username,
            StringComparison.OrdinalIgnoreCase));

        if (user == null)
        {
            return NotFound(new
            {
                success = false,
                message = "User not found."
            });
        }

        if (user.Password != request.OldPassword)
        {
            return BadRequest(new
            {
                success = false,
                message = "Old password is incorrect."
            });
        }

        user.Password = request.NewPassword;

        return Ok(new
        {
            success = true,
            message = "Password changed successfully."
        });
    }


   }
