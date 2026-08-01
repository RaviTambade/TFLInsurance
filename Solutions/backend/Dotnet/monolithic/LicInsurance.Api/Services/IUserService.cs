using System.Collections.Generic;
using LicInsurance.Api.Models;
 

namespace LicInsurance.Api.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);


        IEnumerable<User> GetAll();

        User GetById(int id);
    }
}