using  LicInsurance.Api.Models;
namespace TFLInsurance.LicInsurance.Repositories.Interfaces;
        
 public interface IAgentsRepository
 {
     List<Agents> GetAll();

     Agents? GetById(int id);

     int Save(Agents policy);

     int Delete(int id);
 }