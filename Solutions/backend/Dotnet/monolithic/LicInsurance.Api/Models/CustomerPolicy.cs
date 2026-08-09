using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LicInsurance.Api.Models;

/// <summary>
/// Represents the relationship between a Customer and their Policy.
/// This model is used to manage customer policies.
/// </summary>
[Table("customer_policies")]
public class CustomerPolicy
{
    [Key]
    public int CustomerPolicyId { get; set; }

    [Required]
    [ForeignKey(nameof(Customer))]
    public int CustomerId { get; set; }

    [Required]
    [ForeignKey(nameof(Policy))]
    public int PolicyId { get; set; }

    /// <summary>
    /// Date when the customer purchased/enrolled for this policy
    /// </summary>
    public DateTime? PurchaseDate { get; set; }

    /// <summary>
    /// Date when the policy will expire/end
    /// </summary>
    public DateTime? ExpiryDate { get; set; }

    /// <summary>
    /// Current status of the customer's policy (Active, Inactive, Expired, Cancelled, etc.)
    /// </summary>
    public string Status { get; set; } = "Active";

    /// <summary>
    /// Premium amount for this policy
    /// </summary>
    public decimal PremiumAmount { get; set; }

    /// <summary>
    /// Payment frequency (Monthly, Quarterly, Annually, etc.)
    /// </summary>
    public string? PaymentFrequency { get; set; }

    /// <summary>
    /// Last payment date for this policy
    /// </summary>
    public DateTime? LastPaymentDate { get; set; }

    /// <summary>
    /// Next payment due date
    /// </summary>
    public DateTime? NextPaymentDueDate { get; set; }

    /// <summary>
    /// Additional notes or remarks about the customer's policy
    /// </summary>
    public string? Remarks { get; set; }

    /// <summary>
    /// Indicates if the policy is currently active
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Record creation timestamp
    /// </summary>
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Record last modification timestamp
    /// </summary>
    public DateTime? ModifiedDate { get; set; }

    /// <summary>
    /// Navigation property to Customer
    /// </summary>
    [NotMapped]
    public virtual Customer? Customer { get; set; }

    /// <summary>
    /// Navigation property to Policy
    /// </summary>
    [NotMapped]
    public virtual Policy? Policy { get; set; }
}
