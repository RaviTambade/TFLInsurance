using LicInsurance.Api.Models;
using LicInsurance.Api.Repositories.Interfaces;

namespace LicInsurance.Api.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }
        
        public IEnumerable<Customer> GetCustomers()
        {
            return _customerRepository.GetCustomers();
        }

        public Customer? GetCustomerById(int customerId)
        {
            return _customerRepository.GetCustomerById(customerId);
        }

        public int RegisterCustomer(Customer customer)
        {
            return _customerRepository.AddCustomer(customer);
        }

        public bool UpdateCustomer(int customerId, Customer customer)
        {
            return _customerRepository.UpdateCustomer(customerId, customer);
        }

        public bool DeleteCustomer(int customerId)
        {
            return _customerRepository.DeleteCustomer(customerId) > 0;
        }
    }
}

       