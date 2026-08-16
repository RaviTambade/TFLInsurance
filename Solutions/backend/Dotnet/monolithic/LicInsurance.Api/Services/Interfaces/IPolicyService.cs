using LicInsurance.Api.Models;

namespace TFLInsurance.LicInsurance.Services.Interfaces;

public interface IPolicyService
{
    List<Policy> GetAll();

    Policy? GetById(int id);

    List<Policy> GetPoliciesByCustomerId(int customerId);

    List<Policy> GetPoliciesByAgentId(int agentId);

    int CreatePolicy(Policy policy);

    bool UpdatePolicy(int id, Policy policy);

    bool RenewPolicy(int id);

    int DeletePolicy(int id);
}
