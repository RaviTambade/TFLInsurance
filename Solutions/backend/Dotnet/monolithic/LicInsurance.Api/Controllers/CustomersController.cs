using Microsoft.AspNetCore.Mvc;

using LicInsurance.Api.Models;
using LicInsurance.Api.Services;

namespace LicInsurance.Api.Controllers;
public class CustomersController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomersController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var customers = _customerService.GetAll();
        return Ok(customers);
    }
}