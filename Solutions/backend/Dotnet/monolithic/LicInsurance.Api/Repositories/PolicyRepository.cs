using TFLInsurance.LicInsurance.Repositories.Interfaces;
using LicInsurance.Api.Models;
using LicInsurance.Api.Data.Constant;
using LicInsurance.Api.Repositories.Dapper;

namespace TFLInsurance.LicInsurance.Repositories;

public class PolicyRepository : IPolicyRepository
{
    private readonly IDapperfactory _dapper;

    public PolicyRepository(IDapperfactory dapper)
    {
        _dapper = dapper;
    }

    public List<Policy> GetAll()
    {
        return _dapper.Query<Policy>(
            PolicyStoredProcedure.POLICY_GET_ALL)
            .ToList();
    }

    public Policy? GetById(int id)
    {
        return _dapper.QueryFirstOrDefault<Policy>(
            PolicyStoredProcedure.POLICY_GET_BY_ID,
            new
            {
                PolicyId = id
            });
    }

    public List<Policy> GetPoliciesByCustomerId(int customerId)
    {
        return _dapper.Query<Policy>(
            PolicyStoredProcedure.POLICY_GET_BY_CUSTOMER_ID,
            new
            {
                CustomerId = customerId
            })
            .ToList();
    }

    public List<Policy> GetPoliciesByAgentId(int agentId)
    {
        return _dapper.Query<Policy>(
            PolicyStoredProcedure.POLICY_GET_BY_AGENT_ID,
            new
            {
                AgentId = agentId
            })
            .ToList();
    }

    public int Save(Policy policy)
    {
        return _dapper.Execute(
            PolicyStoredProcedure.POLICY_SAVE,
            new
            {
                policy.PolicyId,
                policy.PolicyNumber,
                policy.CustomerId,
                policy.AgentId,
                policy.EmployeeId,
                policy.PolicyType,
                policy.PolicyAmount,
                policy.IsRenewed
            });
    }

    public bool Update(int id, Policy policy)
    {
        int result = _dapper.Execute(
            PolicyStoredProcedure.POLICY_UPDATE,
            new
            {
                PolicyId = id,
                policy.PolicyNumber,
                policy.CustomerId,
                policy.AgentId,
                policy.EmployeeId,
                policy.PolicyType,
                policy.PolicyAmount,
                policy.IsRenewed
            });
        return result > 0;
    }

    public bool UpdateRenewal(int id)
    {
        int result = _dapper.Execute(
            PolicyStoredProcedure.POLICY_UPDATE_RENEWAL,
            new
            {
                PolicyId = id
            });
        return result > 0;
    }

    public int Delete(int id)
    {
        return _dapper.Execute(
            PolicyStoredProcedure.POLICY_DELETE,
            new
            {
                PolicyId = id
            });
    }
}
