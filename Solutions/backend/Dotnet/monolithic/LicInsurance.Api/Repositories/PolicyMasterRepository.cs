using System.Text.Json;
using TFLInsurance.LicInsurance.Repositories.Interfaces;
using LicInsurance.Api.Models.PolicyMaster;

namespace TFLInsurance.LicInsurance.Repositories;

public class PolicyMasterRepository : IPolicyMasterRepository
{
    private readonly IWebHostEnvironment _environment;

    public PolicyMasterRepository(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<PolicyMasterDto> GetPolicyMasterAsync()
    {
        var filePath = Path.Combine(
            _environment.ContentRootPath,
            "Configuration",
            "policy-master.json");

        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException(
                "Policy master configuration file was not found.",
                filePath);
        }

        var json = await File.ReadAllTextAsync(filePath);

        var policyMaster = JsonSerializer.Deserialize<PolicyMasterDto>(
            json,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

        return policyMaster ?? new PolicyMasterDto();
    }

    public async Task<PolicyTypeDto?> GetPolicyTypeAsync(
        string policyType)
    {
        var policyMaster = await GetPolicyMasterAsync();

        return policyMaster.PolicyTypes
            .FirstOrDefault(x =>
                x.PolicyType.Equals(
                    policyType,
                    StringComparison.OrdinalIgnoreCase));
    }
}
