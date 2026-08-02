using Microsoft.AspNetCore.Mvc;
using LicInsurance.Api.Services.Interfaces;

namespace LicInsurance.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PremiumsController : ControllerBase
{
    private readonly IPremiumServices _premiumServices;

    public PremiumsController(IPremiumServices premiumServices)
    {
        _premiumServices = premiumServices;
    }

    [HttpGet]
    [Route("getpedpremium")]
    public IActionResult GetPedPremiumsByPolicyId(int policyId)
    {
        var premiums = _premiumServices.GetPedPremiumsByPolicyId(policyId);
        return Ok(premiums);
    }

    [HttpGet]
    [Route("getpendingallpremium")]
    public IActionResult GetPendingAllPremiumsByPolicyId(int policyId)
    {
        var premiums = _premiumServices.GetPendingAllPremiumsByPolicyId(policyId);
        return Ok(premiums);
    }

    [HttpGet]
    [Route("paypremium")]
    public IActionResult PayPremium(long policyNumber,decimal amount)
    {
        var premiums = _premiumServices.PayPremium(policyNumber,amount);
        return Ok(premiums);
    }
}