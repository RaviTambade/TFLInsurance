
using Hangfire;
using LicInsurance.Api.DTOs;
using LicInsurance.Api.Models;
using LicInsurance.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using TFLInsurance.Licinsruance.Services;
using TFLInsurance.Licinsruance.Services.Interfaces;
using TFLInsurance.Licinsruance.Services.Interfaces;


namespace  TFLInsurance.Licinsruance.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ClaimsController : ControllerBase
{
    private readonly IClaimService _claimService;
    private readonly IBackgroundJobClient _backgroundJobClient;

    public ClaimsController(IClaimService claimService, IBackgroundJobClient backgroundJobClient)
    {
        _claimService = claimService;
        _backgroundJobClient = backgroundJobClient;
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

    [HttpPost("{claimId}/process")]
    public IActionResult ProcessClaim(int claimId)
    {
        var jobId = _backgroundJobClient.Enqueue<IClaimProcessingJob>(
            job => job.ProcessClaimAsync(claimId));

        return Ok(new
        {
            Message = "Claim processing job has been queued successfully.",
            ClaimId = claimId,
            JobId = jobId
        });
    }
}