using LicInsurance.Api.Models;
namespace TFLInsurance.LicInsurance.Repositories.Interfaces;

public interface IPolicyRepository
{
    List<Policy> GetAll();

    Policy? GetById(int id);

    List<Policy> GetPoliciesByCustomerId(int customerId);

    List<Policy> GetPoliciesByAgentId(int agentId);

    int Save(Policy policy);

    bool Update(int id, Policy policy);

    bool UpdateRenewal(int id);

    int Delete(int id);
}
