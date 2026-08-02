using  LicInsurance.Api.Models;
namespace TFLInsurance.LicInsurance.Repositories.Interfaces;

 public interface IPolicyRepository
 {
     List<Policy> GetAll();

     Policy? GetById(int id);

     int Save(Policy policy);

     int Delete(int id);
 }