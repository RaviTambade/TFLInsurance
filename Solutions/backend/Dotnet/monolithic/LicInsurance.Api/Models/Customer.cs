using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LicInsurance.Api.Models;

[Table("customers")]
public class Customer
{
    [Key]
    [Column("customer_id")]
    public int CustomerId { get; set; }

    [Required]
    [Column("first_name")]
    [MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [Column("last_name")]
    [MaxLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Column("email")]
    [MaxLength(200)]
    public string? Email { get; set; }

    [Column("mobile_number")]
    [MaxLength(20)]
    public string? MobileNumber { get; set; }

    [Column("address")]
    public string? Address { get; set; }

    [Column("created_on")]
    public DateTime? CreatedOn { get; set; }
}
