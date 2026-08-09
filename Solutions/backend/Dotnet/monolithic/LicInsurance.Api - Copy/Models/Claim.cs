using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LicInsurance.Api.Models;

[Table("claims")]
public class Claim
{
    public int ClaimId { get; set; }

    public string PolicyNumber { get; set; } = string.Empty;

    public int CustomerId { get; set; }

    public DateTime ClaimDate { get; set; }

    public string ClaimType { get; set; } = string.Empty;

    public string? Reason { get; set; }

    public decimal ClaimAmount { get; set; }

    public decimal? ApprovedAmount { get; set; }

    public string? Status { get; set; }

    public string? Remarks { get; set; }

    public DateTime? SettlementDate { get; set; }
}
