using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LicInsurance.Api.Models;

[Table("claims")]
public class Claim
{
    [Key]
    [Column("claim_id")]
    public int ClaimId { get; set; }

    [Column("policy_id")]
    public int PolicyId { get; set; }

    [Column("claim_number")]
    [MaxLength(100)]
    public string? ClaimNumber { get; set; }

    [Column("claim_type")]
    [MaxLength(100)]
    public string? ClaimType { get; set; }

    [Column("claim_status")]
    [MaxLength(50)]
    public string? ClaimStatus { get; set; }

    [Column("claim_date")]
    public DateTime? ClaimDate { get; set; }

    [Column("amount")]
    public decimal Amount { get; set; }

    [Column("description")]
    public string? Description { get; set; }

    [Column("created_on")]
    public DateTime? CreatedOn { get; set; }

    [Column("created_by")]
    [MaxLength(100)]
    public string? CreatedBy { get; set; }
}
