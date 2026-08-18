using Dapper;
using LicInsurance.Api.Data.Constant;
using LicInsurance.Api.DTOs;
using LicInsurance.Api.Models;
using LicInsurance.Api.Repositories.Dapper;
using System.Data;
using TFLInsurance.Licinsruance.Repositories.Interfaces;

namespace TFLInsurance.Licinsruance.Repositories;


public class ClaimRepository : IClaimRepository
{
    private readonly IDapperfactory _dapper;

    public ClaimRepository(IDapperfactory dapper)
    {
        _dapper = dapper;
    }

    public async Task<List<Claim>> GetAllClaimsAsync()
    {
        var result = await _dapper.QueryAsync<Claim>(
            ClaimStoredProcedure.CLAIM_GET_ALL);

        return result.ToList();
    }

    public async Task<Claim?> GetClaimByIdAsync(int claimId)
    {
        return await _dapper.QueryFirstOrDefaultAsync<Claim>(
            ClaimStoredProcedure.CLAIM_GET_BY_ID,
            new
            {
                p_ClaimId = claimId
            });
    }

    public async Task<List<Claim>> GetCustomerClaimsAsync(int customerId)
    {
        var result = await _dapper.QueryAsync<Claim>(
            ClaimStoredProcedure.CLAIM_GET_BY_CUSTOMER,
            new
            {
                p_CustomerId = customerId
            });

        return result.ToList();
    }

    public async Task<int> CreateClaimAsync(Claim claim)
    {
        return await _dapper.ExecuteAsync(
            ClaimStoredProcedure.CLAIM_SAVE,
            new
            {
                p_PolicyNumber=claim.PolicyNumber,
                p_CustomerId=claim.CustomerId,
                p_ClaimDate=claim.ClaimDate,
                p_ClaimType=claim.ClaimType,
                p_Reason=claim.Reason,
                p_ClaimAmount=claim.ClaimAmount
            });
    }

    public async Task<int> UpdateClaimAsync(Claim claim)
    {
        return await _dapper.ExecuteAsync(
            ClaimStoredProcedure.CLAIM_UPDATE,
            new
            {
                p_ClaimId= claim.ClaimId,
                p_ClaimType=claim.ClaimType,
                p_Reason=claim.Reason,
                p_ClaimAmount= claim.ClaimAmount,
                p_Remarks = claim.Remarks
            });
    }

    public async Task<int> ChangeClaimStatusAsync(
        int claimId,
        string status,
        string? remarks)
    {
        return await _dapper.ExecuteAsync(
            ClaimStoredProcedure.CLAIM_CHANGE_STATUS,
            new
            {
                p_ClaimId = claimId,
                p_Status = status,
                p_Remarks = remarks
            });
    }

    public async Task<int> ApproveClaimAsync(
        int claimId,
        decimal approvedAmount,
        string? remarks)
    {
        return await _dapper.ExecuteAsync(
            ClaimStoredProcedure.CLAIM_APPROVE,
            new
            {
                p_ClaimId = claimId,
                p_ApprovedAmount = approvedAmount,
                p_Remarks = remarks
            });
    }

    public async Task<int> RejectClaimAsync(
        int claimId,
        string? remarks)
    {
        return await _dapper.ExecuteAsync(
            ClaimStoredProcedure.CLAIM_REJECT,
            new
            {
                p_ClaimId = claimId,
                p_Remarks = remarks
            });
    }

    
}