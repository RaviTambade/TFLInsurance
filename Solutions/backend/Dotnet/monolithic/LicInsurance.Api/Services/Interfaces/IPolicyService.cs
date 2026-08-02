using LicInsurance.Api.Models;

namespace TFLInsurance.LicInsurance.Services.Interfaces;

 public interface IPolicyService
 {
     List<Policy> GetAll();

     Policy? GetById(int id);

     int Save(Policy policy);

     int Delete(int id);
 }