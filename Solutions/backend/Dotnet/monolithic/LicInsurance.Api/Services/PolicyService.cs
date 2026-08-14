using LicInsurance.Api.Models;
using TFLInsurance.LicInsurance.Services.Interfaces;
using TFLInsurance.LicInsurance.Repositories.Interfaces;

namespace TFLInsurance.LicInsurance.Services;

public class PolicyService : IPolicyService
{
    private readonly IPolicyRepository _repository;
    private readonly IPolicyMasterRepository _policyMasterRepository;
    private readonly ILogger<PolicyService> _logger;

    public PolicyService(
        IPolicyRepository repository,
        IPolicyMasterRepository policyMasterRepository,
        ILogger<PolicyService> logger)
    {
        _repository = repository;
        _policyMasterRepository = policyMasterRepository;
        _logger = logger;
    }

    public List<Policy> GetAll()
    {
        _logger.LogInformation("Retrieving all policies from repository.");
        return _repository.GetAll();
    }

    public Policy? GetById(int id)
    {
        if (id <= 0)
            throw new ArgumentException("Policy ID must be greater than 0.", nameof(id));

        _logger.LogInformation($"Retrieving policy with ID: {id}");
        return _repository.GetById(id);
    }

    public List<Policy> GetPoliciesByCustomerId(int customerId)
    {
        if (customerId <= 0)
            throw new ArgumentException("Customer ID must be greater than 0.", nameof(customerId));

        _logger.LogInformation($"Retrieving policies for customer ID: {customerId}");
        return _repository.GetPoliciesByCustomerId(customerId);
    }

    public List<Policy> GetPoliciesByAgentId(int agentId)
    {
        if (agentId <= 0)
            throw new ArgumentException("Agent ID must be greater than 0.", nameof(agentId));

        _logger.LogInformation($"Retrieving policies for agent ID: {agentId}");
        return _repository.GetPoliciesByAgentId(agentId);
    }

    public int CreatePolicy(Policy policy)
    {
        // Validate required fields
        if (policy == null)
            throw new ArgumentNullException(nameof(policy), "Policy cannot be null.");

        if (policy.CustomerId <= 0)
            throw new ArgumentException("Customer ID is required and must be greater than 0.", nameof(policy.CustomerId));

        if (string.IsNullOrWhiteSpace(policy.PolicyType))
            throw new ArgumentException("Policy Type is required.", nameof(policy.PolicyType));

        if (policy.PolicyAmount <= 0)
            throw new ArgumentException("Policy Amount must be greater than 0.", nameof(policy.PolicyAmount));

        // Validate PolicyType against Policy Master
        _logger.LogInformation($"Validating policy type '{policy.PolicyType}' against Policy Master.");
        var validPolicyType = _policyMasterRepository.GetPolicyTypeAsync(policy.PolicyType).Result;
        if (validPolicyType == null)
            throw new ArgumentException($"Policy type '{policy.PolicyType}' is not valid or does not exist in Policy Master.", nameof(policy.PolicyType));

        // Validate optional AgentId if provided
        if (policy.AgentId.HasValue && policy.AgentId.Value <= 0)
            throw new ArgumentException("Agent ID must be greater than 0 if provided.", nameof(policy.AgentId));

        // Validate optional EmployeeId if provided
        if (policy.EmployeeId.HasValue && policy.EmployeeId.Value <= 0)
            throw new ArgumentException("Employee ID must be greater than 0 if provided.", nameof(policy.EmployeeId));

        // Generate PolicyNumber if not provided
        if (string.IsNullOrWhiteSpace(policy.PolicyNumber))
        {
            policy.PolicyNumber = GeneratePolicyNumber();
            _logger.LogInformation($"Generated policy number: {policy.PolicyNumber}");
        }

        _logger.LogInformation($"Creating policy: {policy.PolicyNumber} for customer: {policy.CustomerId}");
        return _repository.Save(policy);
    }

    public bool UpdatePolicy(int id, Policy policy)
    {
        if (id <= 0)
            throw new ArgumentException("Policy ID must be greater than 0.", nameof(id));

        if (policy == null)
            throw new ArgumentNullException(nameof(policy), "Policy cannot be null.");

        if (policy.CustomerId <= 0)
            throw new ArgumentException("Customer ID is required and must be greater than 0.", nameof(policy.CustomerId));

        if (string.IsNullOrWhiteSpace(policy.PolicyType))
            throw new ArgumentException("Policy Type is required.", nameof(policy.PolicyType));

        // Validate PolicyType against Policy Master
        var validPolicyType = _policyMasterRepository.GetPolicyTypeAsync(policy.PolicyType).Result;
        if (validPolicyType == null)
            throw new ArgumentException($"Policy type '{policy.PolicyType}' is not valid or does not exist in Policy Master.", nameof(policy.PolicyType));

        _logger.LogInformation($"Updating policy ID: {id}");
        return _repository.Update(id, policy);
    }

    public bool RenewPolicy(int id)
    {
        if (id <= 0)
            throw new ArgumentException("Policy ID must be greater than 0.", nameof(id));

        _logger.LogInformation($"Renewing policy ID: {id}");
        return _repository.UpdateRenewal(id);
    }

    public int DeletePolicy(int id)
    {
        if (id <= 0)
            throw new ArgumentException("Policy ID must be greater than 0.", nameof(id));

        _logger.LogInformation($"Deleting policy ID: {id}");
        return _repository.Delete(id);
    }

    /// <summary>
    /// Generates a unique policy number with format: POL-{YearCreated}-{SequentialNumber}
    /// </summary>
    private string GeneratePolicyNumber()
    {
        var year = DateTime.Now.Year;
        var timestamp = DateTime.Now.Ticks;
        return $"POL-{year}-{timestamp % 100000:D5}";
    }
}
