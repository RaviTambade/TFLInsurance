using LicInsurance.Api.Models.PolicyMaster;

namespace TFLInsurance.LicInsurance.Services.Interfaces;

public interface IPolicyMasterService
{
    Task<PolicyMasterDto> GetPolicyMasterAsync();

    Task<PolicyTypeDto?> GetPolicyTypeAsync(string policyType);
}
