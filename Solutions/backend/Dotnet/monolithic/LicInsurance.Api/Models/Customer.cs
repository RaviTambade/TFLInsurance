using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LicInsurance.Api.Models;

[Table("customers")]
public class Customer
{
    public int CustomerId { get; set; }

    public int? UserId { get; set; }

    public string CustomerCode { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public DateTime? DateOfBirth { get; set; }

    public string? Gender { get; set; }

    public string Email { get; set; } = string.Empty;

    public string MobileNumber { get; set; } = string.Empty;

    public string? AddressLine1 { get; set; }

    public string? AddressLine2 { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? PostalCode { get; set; }

    public string? Country { get; set; }

    public string? PanNumber { get; set; }

    public string? AadhaarNumber { get; set; }

    public string? Occupation { get; set; }

    public decimal? AnnualIncome { get; set; }

    public string? NomineeName { get; set; }

    public string? NomineeRelationship { get; set; }

    public string? NomineeContactNumber { get; set; }

    public DateTime? RegistrationDate { get; set; }

    public bool IsActive { get; set; }

    public int? TotalPoliciesPurchased { get; set; }
}
