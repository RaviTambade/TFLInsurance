using LicInsurance.Api.Models;

namespace LicInsurance.Api.Services
{
    public interface ICustomerService
    {
        IEnumerable<Customer> GetCustomers();
        Customer? GetCustomerById(int customerId);
        int RegisterCustomer(Customer customer);
        bool UpdateCustomer(int customerId, Customer customer);
        bool DeleteCustomer(int customerId);
    }
}
