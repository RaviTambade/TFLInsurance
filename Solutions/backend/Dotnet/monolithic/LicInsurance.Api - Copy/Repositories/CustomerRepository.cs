using LicInsurance.Api.Repositories.Interfaces;
using LicInsurance.Api.Models;
using LicInsurance.Api.Data.Constant;
using LicInsurance.Api.Repositories.Dapper;

namespace LicInsurance.Api.Repositories;

public class CustomerRepository : ICustomerRepository
{
    private readonly IDapperfactory _dapper;

    public CustomerRepository(IDapperfactory dapper)
    {
        _dapper = dapper;
    }

    public List<Customer> GetCustomers()
    {
        return _dapper.Query<Customer>(
            CustomerStoredProcedure.Customer_GetAll)
            .ToList();
    }

    public Customer? GetCustomerById(int customerId)
    {
        return _dapper.QueryFirstOrDefault<Customer>(
            CustomerStoredProcedure.Customer_GetById,
            new
            {
                p_CustomerId = customerId
            });
    }

    public int AddCustomer(Customer customer)
    {
        return _dapper.Execute(
            CustomerStoredProcedure.Customer_Add,
            new
            {
                customer.CustomerId,
                customer.UserId,
                customer.CustomerCode,
                customer.FirstName,
                customer.LastName,
                customer.DateOfBirth,
                customer.Gender,
                customer.Email,
                customer.MobileNumber,
                customer.AddressLine1,
                customer.AddressLine2,
                customer.City,
                customer.State,
                customer.PostalCode,
                customer.Country,
                customer.PanNumber,
                customer.AadhaarNumber,
                customer.Occupation,
                customer.AnnualIncome,
                customer.NomineeName,
                customer.NomineeRelationship,
                customer.NomineeContactNumber,
                customer.RegistrationDate,
                customer.IsActive,
                customer.TotalPoliciesPurchased
            });
    }

    public bool UpdateCustomer(int customerId, Customer customer)
    {
        int result = _dapper.Execute(
            CustomerStoredProcedure.Customer_Update,
            new
            {
                CustomerId = customerId,
                customer.UserId,
                customer.CustomerCode,
                customer.FirstName,
                customer.LastName,
                customer.DateOfBirth,
                customer.Gender,
                customer.Email,
                customer.MobileNumber,
                customer.AddressLine1,
                customer.AddressLine2,
                customer.City,
                customer.State,
                customer.PostalCode,
                customer.Country,
                customer.PanNumber,
                customer.AadhaarNumber,
                customer.Occupation,
                customer.AnnualIncome,
                customer.NomineeName,
                customer.NomineeRelationship,
                customer.NomineeContactNumber,
                customer.RegistrationDate,
                customer.IsActive,
                customer.TotalPoliciesPurchased
            });
        return result > 0;
    }

    public int DeleteCustomer(int customerId)
    {
        return _dapper.Execute(
            CustomerStoredProcedure.Customer_Delete,
            new
            {
                CustomerId = customerId
            });
    }
}