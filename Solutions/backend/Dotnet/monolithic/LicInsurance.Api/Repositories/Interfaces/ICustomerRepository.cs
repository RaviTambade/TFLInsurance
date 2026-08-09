using LicInsurance.Api.Models;
namespace LicInsurance.Api.Repositories.Interfaces;

public interface ICustomerRepository
{
    List<Customer> GetCustomers();

    Customer? GetCustomerById(int customerId);

    int AddCustomer(Customer customer);

    bool UpdateCustomer(int customerId, Customer customer);

    int DeleteCustomer(int customerId);
}