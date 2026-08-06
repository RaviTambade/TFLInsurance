using LicInsurance.Api.Models;

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

        public IEnumerable<Customer> GetAll()
        {
            return _customers;
        }

        public Customer? GetById(int id)
        {
            return _customers.FirstOrDefault(x => x.CustomerId == id);
        }

        public Customer Create(Customer customer)
        {
            customer.CustomerId = _customers.Any() ? _customers.Max(x => x.CustomerId) + 1 : 1;
            //customer.CreatedOn ??= DateTime.UtcNow;
            _customers.Add(customer);
            return customer;
        }

        public Customer? Update(int id, Customer customer)
        {
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
        }

        public bool Delete(int id)
        {
            var customer = _customers.FirstOrDefault(x => x.CustomerId == id);
            if (customer == null)
            {
                return false;
            }

            _customers.Remove(customer);
            return true;
        }
    }
}
