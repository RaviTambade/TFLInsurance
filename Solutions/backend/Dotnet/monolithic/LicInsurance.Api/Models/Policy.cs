using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LicInsurance.Api.Models;

[Table("policies")]
public class Policy
{
    [Key]
    [Column("policy_id")]
    public int PolicyId { get; set; }

    [Required]
    [Column("policy_name")]
    [MaxLength(200)]
    public string PolicyName { get; set; } = string.Empty;

    [Column("policy_type")]
    [MaxLength(100)]
    public string PolicyType { get; set; } = string.Empty;

    [Column("description")]
    public string? Description { get; set; }

    [Column("minimum_sum_assured")]
    public decimal MinimumSumAssured { get; set; }

    [Column("maximum_sum_assured")]
    public decimal MaximumSumAssured { get; set; }

    [Column("minimum_duration")]
    public int MinimumDuration { get; set; }

    [Column("maximum_duration")]
    public int MaximumDuration { get; set; }

    [Column("is_active")]
    public bool IsActive { get; set; }

    [Column("created_on")]
    public DateTime CreatedOn { get; set; }

    [Column("created_by")]
    [MaxLength(100)]
    public string? CreatedBy { get; set; }

    [Column("updated_on")]
    public DateTime? UpdatedOn { get; set; }

    [Column("updated_by")]
    [MaxLength(100)]
    public string? UpdatedBy { get; set; }
}