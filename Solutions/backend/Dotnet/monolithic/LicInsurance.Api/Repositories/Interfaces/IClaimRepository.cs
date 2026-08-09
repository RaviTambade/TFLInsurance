using LicInsurance.Api.DTOs;
using LicInsurance.Api.Models;
namespace TFLInsurance.Licinsruance.Repositories.Interfaces;

public interface IClaimRepository
{
    Task<List<Claim>> GetAllClaimsAsync();

    Task<Claim?> GetClaimByIdAsync(int claimId);

    Task<List<Claim>> GetCustomerClaimsAsync(int customerId);

    Task<int> CreateClaimAsync(Claim claim);

    Task<int> UpdateClaimAsync(Claim claim);

    Task<int> ChangeClaimStatusAsync(
        int claimId,
        string status,
        string? remarks);

    Task<int> ApproveClaimAsync(
        int claimId,
        decimal approvedAmount,
        string? remarks);

    Task<int> RejectClaimAsync(
        int claimId,
        string? remarks);
}