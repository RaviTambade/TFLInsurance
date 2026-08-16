using LicInsurance.Api.Models;
using TFLInsurance.LicInsurance.Services.Interfaces;
using TFLInsurance.LicInsurance.Repositories.Interfaces;


namespace TFLInsurance.LicInsurance.Services
{
    public class AgentsService : IAgentsService
    {
        private readonly IAgentsRepository _repository;

       public AgentsService(IAgentsRepository repository)
       {
           _repository = repository;
       }

       public List<Agents> GetAll()
       {
           return _repository.GetAll();
       }

       public Agents? GetById(int id)
       {
           return _repository.GetById(id);
       }

       public int Save(Agents agents)
       {
           if (string.IsNullOrWhiteSpace(agents.AgentCode))
               throw new Exception("AgentCode is required.");


           return _repository.Save(agents);
       }

       public int Delete(int id)
       {
           return _repository.Delete(id);
       }
   
        
    }
    

}