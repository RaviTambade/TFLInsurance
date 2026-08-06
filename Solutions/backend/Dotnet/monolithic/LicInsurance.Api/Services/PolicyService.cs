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
           if (string.IsNullOrWhiteSpace(policy.PolicyNumber))
               throw new Exception("Policy Number is required.");


           return _repository.Save(policy);
       }

    public bool Update(int id,Policy policy)
    {
        if (policy.EmployeeId <= 0)
            throw new Exception("Policy ID is required.");

        return _repository.Update(id, policy);
    }


    public int Delete(int id)
       {
           return _repository.Delete(id);
       }
   }