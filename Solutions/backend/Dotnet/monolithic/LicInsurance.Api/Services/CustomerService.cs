using LicInsurance.Api.Models;
using LicInsurance.Api.Repositories.Interfaces;

namespace LicInsurance.Api.Services
{
    public class CustomerService : ICustomerService
    {
<<<<<<< HEAD
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
=======
        private readonly ICustomerRepository _customerRepository;
>>>>>>> ab69a6d2ec2481f9aaa53357773ece14596eef8b

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
<<<<<<< HEAD
            customer.CustomerId = _customers.Any() ? _customers.Max(x => x.CustomerId) + 1 : 1;
            //customer.CreatedOn ??= DateTime.UtcNow;
            _customers.Add(customer);
            return customer;
=======
            return _customerRepository.AddCustomer(customer);
>>>>>>> ab69a6d2ec2481f9aaa53357773ece14596eef8b
        }

        public bool UpdateCustomer(int customerId, Customer customer)
        {
<<<<<<< HEAD
            var existingCustomer = _customers.FirstOrDefault(x => x.CustomerId == id);
            if (existingCustomer == null)
            {
                return null;
            }

            existingCustomer.FirstName = customer.FirstName;
            existingCustomer.LastName = customer.LastName;
            existingCustomer.Email = customer.Email;
            existingCustomer.MobileNumber = customer.MobileNumber;
            //existingCustomer.Address = customer.Address;
            //existingCustomer.CreatedOn = existingCustomer.CreatedOn ?? DateTime.UtcNow;

            return existingCustomer;
=======
            return _customerRepository.UpdateCustomer(customerId, customer);
>>>>>>> ab69a6d2ec2481f9aaa53357773ece14596eef8b
        }

        public bool DeleteCustomer(int customerId)
        {
            return _customerRepository.DeleteCustomer(customerId) > 0;
        }
    }
}

       