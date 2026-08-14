using LicInsurance.Api.Models;
using LicInsurance.Api.Repositories.Interfaces;

namespace LicInsurance.Api.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly List<Customer> _customers = new()
        {
            new Customer
            {
                CustomerId = 1,
                FirstName = "John",
                LastName = "Doe",
                Email = "john.doe@example.com",
                MobileNumber = "1234567890",
                //Address = "123 Main Street",
                //CreatedOn = DateTime.UtcNow
            },
            new Customer
            {
                CustomerId = 2,
                FirstName = "Jane",
                LastName = "Smith",
                Email = "jane.smith@example.com",
                MobileNumber = "0987654321",
                //Address = "456 Elm Street",
                //CreatedOn = DateTime.UtcNow
            }
        };
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
            customer.CustomerId = _customers.Any() ? _customers.Max(x => x.CustomerId) + 1 : 1;
            //customer.CreatedOn ??= DateTime.UtcNow;
            _customers.Add(customer);
            return _customerRepository.AddCustomer(customer);
        }

        public bool UpdateCustomer(int customerId, Customer customer)
        {
  
            var existingCustomer = _customers.FirstOrDefault(x => x.CustomerId == customerId);
            if (existingCustomer == null)
            {
                return false;
            }

            existingCustomer.FirstName = customer.FirstName;
            existingCustomer.LastName = customer.LastName;
            existingCustomer.Email = customer.Email;
            existingCustomer.MobileNumber = customer.MobileNumber;
            //existingCustomer.Address = customer.Address;
            //existingCustomer.CreatedOn = existingCustomer.CreatedOn ?? DateTime.UtcNow;

            return _customerRepository.UpdateCustomer(customerId, customer);

        }

        public bool DeleteCustomer(int customerId)
        {
            return _customerRepository.DeleteCustomer(customerId) > 0;
        }
    }
}

       