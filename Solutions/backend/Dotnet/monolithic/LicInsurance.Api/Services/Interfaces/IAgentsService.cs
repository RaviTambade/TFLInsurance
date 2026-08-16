using System.Collections.Generic;
using LicInsurance.Api.Models;
 

namespace TFLInsurance.LicInsurance.Services.Interfaces
{
    public interface IAgentsService
    {
    List<Agents> GetAll();

     Agents? GetById(int id);

     int Save(Agents policy);

     int Delete(int id);
    }
}