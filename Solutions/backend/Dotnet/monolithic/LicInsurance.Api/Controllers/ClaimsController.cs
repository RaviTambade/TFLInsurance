using Microsoft.AspNetCore.Mvc;

using TFLInsurance.Licinsruance.Entities;
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