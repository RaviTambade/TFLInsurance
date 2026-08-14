using LicInsurance.Api.Models.PolicyMaster;

namespace TFLInsurance.LicInsurance.Repositories.Interfaces;

public interface IPolicyMasterRepository
{
    Task<PolicyMasterDto> GetPolicyMasterAsync();

    Task<PolicyTypeDto?> GetPolicyTypeAsync(string policyType);
}
