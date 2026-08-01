using LicInsurance.Api.Models;

namespace LicInsurance.Api.Services
{
    public interface ICustomerService
    {
        IEnumerable<Customer> GetAll();
        Customer? GetById(int id);
        Customer Create(Customer customer);
        Customer? Update(int id, Customer customer);
        bool Delete(int id);
    }
}
