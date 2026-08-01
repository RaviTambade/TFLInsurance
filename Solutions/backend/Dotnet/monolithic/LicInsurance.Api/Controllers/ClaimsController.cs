using Microsoft.AspNetCore.Mvc;

using LicInsurance.Api.Models;
using TFLInsurance.Licinsruance.Services;


namespace  TFLInsurance.Licinsruance.Controllers;


[ApiController]
public class ClaimsController : ControllerBase
{
    
    private IClaimService  _claimService;

    public ClaimsController(IClaimService svc)
    {
        _claimService=svc;
    }


}