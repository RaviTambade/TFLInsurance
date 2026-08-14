using TFLInsurance.LicInsurance.Repositories.Interfaces;
using TFLInsurance.LicInsurance.Services.Interfaces;
using LicInsurance.Api.Models.PolicyMaster;

namespace TFLInsurance.LicInsurance.Services;

public class PolicyMasterService : IPolicyMasterService
{
    private readonly IPolicyMasterRepository _repository;

    public PolicyMasterService(IPolicyMasterRepository repository)
    {
        _repository = repository;
    }

    public async Task<PolicyMasterDto> GetPolicyMasterAsync()
    {
        return await _repository.GetPolicyMasterAsync();
    }

    public async Task<PolicyTypeDto?> GetPolicyTypeAsync(string policyType)
    {
        if (string.IsNullOrWhiteSpace(policyType))
            throw new ArgumentException("Policy type cannot be empty.", nameof(policyType));

        return await _repository.GetPolicyTypeAsync(policyType);
    }
}
