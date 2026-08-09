<<<<<<< HEAD
using TFLInsurance.Licinsruance.Services.Interfaces;
using LicInsurance.Api.DTOs;
using LicInsurance.Api.Models;
using Microsoft.AspNetCore.Mvc;
using TFLInsurance.Licinsruance.Services;
using TFLInsurance.Licinsruance.Services.Interfaces;


namespace  TFLInsurance.Licinsruance.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ClaimsController : ControllerBase
{
    private readonly IClaimService _claimService;

    public ClaimsController(IClaimService claimService)
    {
        _claimService = claimService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllClaims()
    {
        var claims = await _claimService.GetAllClaimsAsync();

        return Ok(claims);
    }

    [HttpGet("{claimId:int}")]
    public async Task<IActionResult> GetClaimById(int claimId)
    {
        var claim = await _claimService.GetClaimByIdAsync(claimId);

        if (claim == null)
            return NotFound("Claim not found.");

        return Ok(claim);
    }

    [HttpGet("customer/{customerId:int}")]
    public async Task<IActionResult> GetCustomerClaims(int customerId)
    {
        var claims =
            await _claimService.GetCustomerClaimsAsync(customerId);

        return Ok(claims);
    }

    [HttpPost]
    public async Task<IActionResult> CreateClaim(
        CreateClaimRequestDto request)
    {
        var claimId =
            await _claimService.CreateClaimAsync(request);

        return Ok(new
        {
            ClaimId = claimId,
            Message = "Claim submitted successfully."
        });
    }

    [HttpPut("{claimId:int}")]
    public async Task<IActionResult> UpdateClaim(
        int claimId,
        UpdateClaimRequestDto request)
    {
        var result =
            await _claimService.UpdateClaimAsync(
                claimId,
                request);

        return Ok(new
        {
            Message = "Claim updated successfully."
        });
    }

    [HttpPatch("{claimId:int}/status")]
    public async Task<IActionResult> ChangeClaimStatus(
        int claimId,
        ChangeClaimStatusRequestDto request)
    {
        var result =
            await _claimService.ChangeClaimStatusAsync(
                claimId,
                request);

        return Ok(new
        {
            Message = "Claim status updated successfully."
        });
    }

    [HttpPatch("{claimId:int}/approve")]
    public async Task<IActionResult> ApproveClaim(
        int claimId,
        ApproveClaimRequestDto request)
    {
        var result =
            await _claimService.ApproveClaimAsync(
                claimId,
                request);

        return Ok(new
        {
            Message = "Claim approved successfully."
        });
    }

    [HttpPatch("{claimId:int}/reject")]
    public async Task<IActionResult> RejectClaim(
        int claimId,
        RejectClaimRequestDto request)
    {
        var result =
            await _claimService.RejectClaimAsync(
                claimId,
                request);

        return Ok(new
        {
            Message = "Claim rejected successfully."
        });
    }
=======
using Microsoft.AspNetCore.Mvc;

namespace TFLInsurance.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClaimsController : ControllerBase
    {
        // =====================================================
        // Claim Registration
        // =====================================================

        // Register a new insurance claim
        [HttpPost]
        public IActionResult RegisterClaim()
        {
            return Ok();
        }

        // Get all claims
        [HttpGet]
        public IActionResult GetAllClaims()
        {
            return Ok();
        }

        // Get claim by Id
        [HttpGet("{claimId}")]
        public IActionResult GetClaim(int claimId)
        {
            return Ok();
        }

        // Update claim details
        [HttpPut("{claimId}")]
        public IActionResult UpdateClaim(int claimId)
        {
            return Ok();
        }

        // Withdraw claim by customer
        [HttpDelete("{claimId}")]
        public IActionResult WithdrawClaim(int claimId)
        {
            return Ok();
        }

        // =====================================================
        // Customer Claims
        // =====================================================

        [HttpGet("customer/{customerId}")]
        public IActionResult GetCustomerClaims(int customerId)
        {
            return Ok();
        }

        [HttpGet("policy/{policyId}")]
        public IActionResult GetClaimsByPolicy(int policyId)
        {
            return Ok();
        }

        // =====================================================
        // Claim Verification
        // =====================================================

        [HttpPost("{claimId}/verify")]
        public IActionResult VerifyClaim(int claimId)
        {
            return Ok();
        }

        [HttpPost("{claimId}/assign-surveyor")]
        public IActionResult AssignSurveyor(int claimId)
        {
            return Ok();
        }

        [HttpGet("{claimId}/surveyor-report")]
        public IActionResult GetSurveyorReport(int claimId)
        {
            return Ok();
        }

        [HttpPost("{claimId}/upload-documents")]
        public IActionResult UploadSupportingDocuments(int claimId)
        {
            return Ok();
        }

        [HttpGet("{claimId}/documents")]
        public IActionResult GetClaimDocuments(int claimId)
        {
            return Ok();
        }

        // =====================================================
        // Claim Review
        // =====================================================

        [HttpPost("{claimId}/approve")]
        public IActionResult ApproveClaim(int claimId)
        {
            return Ok();
        }

        [HttpPost("{claimId}/reject")]
        public IActionResult RejectClaim(int claimId)
        {
            return Ok();
        }

        [HttpPost("{claimId}/reopen")]
        public IActionResult ReopenClaim(int claimId)
        {
            return Ok();
        }

        // =====================================================
        // Settlement
        // =====================================================

        [HttpPost("{claimId}/settle")]
        public IActionResult SettleClaim(int claimId)
        {
            return Ok();
        }

        [HttpGet("{claimId}/settlement")]
        public IActionResult GetSettlementDetails(int claimId)
        {
            return Ok();
        }

        // =====================================================
        // Claim Status
        // =====================================================

        [HttpGet("{claimId}/status")]
        public IActionResult GetClaimStatus(int claimId)
        {
            return Ok();
        }

        [HttpPost("{claimId}/close")]
        public IActionResult CloseClaim(int claimId)
        {
            return Ok();
        }

        // =====================================================
        // Dashboard
        // =====================================================

        [HttpGet("pending")]
        public IActionResult GetPendingClaims()
        {
            return Ok();
        }

        [HttpGet("approved")]
        public IActionResult GetApprovedClaims()
        {
            return Ok();
        }

        [HttpGet("rejected")]
        public IActionResult GetRejectedClaims()
        {
            return Ok();
        }

        [HttpGet("settled")]
        public IActionResult GetSettledClaims()
        {
            return Ok();
        }

        [HttpGet("under-investigation")]
        public IActionResult GetClaimsUnderInvestigation()
        {
            return Ok();
        }

        // =====================================================
        // Reports
        // =====================================================

        [HttpGet("reports/daily")]
        public IActionResult GetDailyClaimReport()
        {
            return Ok();
        }

        [HttpGet("reports/monthly")]
        public IActionResult GetMonthlyClaimReport()
        {
            return Ok();
        }

        [HttpGet("reports/yearly")]
        public IActionResult GetYearlyClaimReport()
        {
            return Ok();
        }

        [HttpGet("reports/claim-ratio")]
        public IActionResult GetClaimSettlementRatio()
        {
            return Ok();
        }

        [HttpGet("reports/high-value")]
        public IActionResult GetHighValueClaims()
        {
            return Ok();
        }

        [HttpGet("reports/fraud-suspected")]
        public IActionResult GetFraudSuspectedClaims()
        {
            return Ok();
        }
    }
>>>>>>> ab69a6d2ec2481f9aaa53357773ece14596eef8b
}