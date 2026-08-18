using LicInsurance.Api.DTOs;
using LicInsurance.Api.Models;
using TFLInsurance.Licinsruance.Repositories;
using TFLInsurance.Licinsruance.Repositories.Interfaces;
using TFLInsurance.Licinsruance.Services.Interfaces;
namespace TFLInsurance.Licinsruance.Services;

public class ClaimService : IClaimService
{
    private readonly IClaimRepository _claimRepository;

    public ClaimService(IClaimRepository claimRepository)
    {
        _claimRepository = claimRepository;
    }

    public async Task<List<ClaimResponseDto>> GetAllClaimsAsync()
    {
        var claims = await _claimRepository.GetAllClaimsAsync();

        return claims.Select(x => new ClaimResponseDto
        {
            ClaimId = x.ClaimId,
            PolicyNumber = x.PolicyNumber,
            CustomerId = x.CustomerId,
            ClaimDate = x.ClaimDate,
            ClaimType = x.ClaimType,
            Reason = x.Reason,
            ClaimAmount = x.ClaimAmount,
            ApprovedAmount = x.ApprovedAmount,
            Status = x.Status,
            Remarks = x.Remarks,
            SettlementDate = x.SettlementDate
        }).ToList();
    }

    public async Task<ClaimResponseDto?> GetClaimByIdAsync(int claimId)
    {
        var claim = await _claimRepository.GetClaimByIdAsync(claimId);

        if (claim == null)
            return null;

        return new ClaimResponseDto
        {
            ClaimId = claim.ClaimId,
            PolicyNumber = claim.PolicyNumber,
            CustomerId = claim.CustomerId,
            ClaimDate = claim.ClaimDate,
            ClaimType = claim.ClaimType,
            Reason = claim.Reason,
            ClaimAmount = claim.ClaimAmount,
            ApprovedAmount = claim.ApprovedAmount,
            Status = claim.Status,
            Remarks = claim.Remarks,
            SettlementDate = claim.SettlementDate
        };
    }

    public async Task<List<ClaimResponseDto>> GetCustomerClaimsAsync(
        int customerId)
    {
        var claims =
            await _claimRepository.GetCustomerClaimsAsync(customerId);

        return claims.Select(x => new ClaimResponseDto
        {
            ClaimId = x.ClaimId,
            PolicyNumber = x.PolicyNumber,
            CustomerId = x.CustomerId,
            ClaimDate = x.ClaimDate,
            ClaimType = x.ClaimType,
            Reason = x.Reason,
            ClaimAmount = x.ClaimAmount,
            ApprovedAmount = x.ApprovedAmount,
            Status = x.Status,
            Remarks = x.Remarks,
            SettlementDate = x.SettlementDate
        }).ToList();
    }

    public async Task<int> CreateClaimAsync(
        CreateClaimRequestDto request)
    {
        var claim = new Claim
        {
            PolicyNumber = request.PolicyNumber,
            CustomerId = request.CustomerId,
            ClaimDate = request.ClaimDate,
            ClaimType = request.ClaimType,
            Reason = request.Reason,
            ClaimAmount = request.ClaimAmount,
            Status = "Submitted"
        };

        return await _claimRepository.CreateClaimAsync(claim);
    }

    public async Task<int> UpdateClaimAsync(
        int claimId,
        UpdateClaimRequestDto request)
    {
        var claim = new Claim
        {
            ClaimId = claimId,
            ClaimType = request.ClaimType,
            Reason = request.Reason,
            ClaimAmount = request.ClaimAmount,
            Remarks = request.Remarks
        };

        return await _claimRepository.UpdateClaimAsync(claim);
    }

    public async Task<int> ChangeClaimStatusAsync(
        int claimId,
        ChangeClaimStatusRequestDto request)
    {
        return await _claimRepository.ChangeClaimStatusAsync(
            claimId,
            request.Status,
            request.Remarks);
    }

    public async Task<int> ApproveClaimAsync(
        int claimId,
        ApproveClaimRequestDto request)
    {
        return await _claimRepository.ApproveClaimAsync(
            claimId,
            request.ApprovedAmount,
            request.Remarks);
    }

    public async Task<int> RejectClaimAsync(
        int claimId,
        RejectClaimRequestDto request)
    {
        return await _claimRepository.RejectClaimAsync(
            claimId,
            request.Remarks);
    }

    public async Task ProcessClaimAsync(int claimId)
    {
        var claim = await _claimRepository.GetClaimByIdAsync(claimId);

        if (claim == null)
        {
            throw new Exception($"Claim with ID {claimId} was not found.");
        }

        // ------------------------------------------------
        // Hangfire background processing logic
        // ------------------------------------------------

        // Put whatever business processing you want here.
        // For example, you can perform validations,
        // calculations, policy checks, etc.

        // For now, we are simply processing the
        // existing claim and updating it using your
        // existing UpdateClaimAsync() method.

        var result = await _claimRepository.UpdateClaimAsync(claim);

        if (result <= 0)
        {
            throw new Exception(
                $"Claim with ID {claimId} could not be updated.");
        }
    }
}