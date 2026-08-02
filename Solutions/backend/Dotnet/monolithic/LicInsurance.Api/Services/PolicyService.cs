using LicInsurance.Api.Models;
using TFLInsurance.LicInsurance.Services.Interfaces;
using TFLInsurance.LicInsurance.Repositories.Interfaces;

namespace TFLInsurance.LicInsurance.Services;

public class PolicyService : IPolicyService
   {
       private readonly IPolicyRepository _repository;

       public PolicyService(IPolicyRepository repository)
       {
           _repository = repository;
       }

       public List<Policy> GetAll()
       {
           return _repository.GetAll();
       }

       public Policy? GetById(int id)
       {
           return _repository.GetById(id);
       }

       public int Save(Policy policy)
       {
           if (string.IsNullOrWhiteSpace(policy.PolicyName))
               throw new Exception("Policy Name is required.");


           return _repository.Save(policy);
       }

       public int Delete(int id)
       {
           return _repository.Delete(id);
       }
   }