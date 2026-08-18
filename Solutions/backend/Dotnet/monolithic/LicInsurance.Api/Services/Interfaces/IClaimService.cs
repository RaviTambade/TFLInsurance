using LicInsurance.Api.DTOs;
namespace TFLInsurance.Licinsruance.Services.Interfaces;

public interface IClaimService
{
    Task<List<ClaimResponseDto>> GetAllClaimsAsync();

    Task<ClaimResponseDto?> GetClaimByIdAsync(int claimId);

    Task<List<ClaimResponseDto>> GetCustomerClaimsAsync(int customerId);

    Task<int> CreateClaimAsync(CreateClaimRequestDto request);

    Task<int> UpdateClaimAsync(
        int claimId,
        UpdateClaimRequestDto request);

    Task<int> ChangeClaimStatusAsync(
        int claimId,
        ChangeClaimStatusRequestDto request);

    Task<int> ApproveClaimAsync(
        int claimId,
        ApproveClaimRequestDto request);

    Task<int> RejectClaimAsync(
        int claimId,
        RejectClaimRequestDto request);

    Task ProcessClaimAsync(int claimId);

}