namespace LicInsurance.Api.DTOs;

/// <summary>
/// Data Transfer Object for CustomerPolicy
/// </summary>
public class CustomerPolicyDto
{
    public int CustomerPolicyId { get; set; }

    public int CustomerId { get; set; }

    public int PolicyId { get; set; }

    public DateTime? PurchaseDate { get; set; }

    public DateTime? ExpiryDate { get; set; }

    public string Status { get; set; } = "Active";

    public decimal PremiumAmount { get; set; }

    public string? PaymentFrequency { get; set; }

    public DateTime? LastPaymentDate { get; set; }

    public DateTime? NextPaymentDueDate { get; set; }

    public string? Remarks { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    // Related data
    public string? CustomerName { get; set; }

    public string? CustomerEmail { get; set; }

    public string? PolicyNumber { get; set; }

    public string? PolicyType { get; set; }

    public decimal PolicyAmount { get; set; }
}

/// <summary>
/// Create/Update DTO for CustomerPolicy
/// </summary>
public class CreateUpdateCustomerPolicyDto
{
    public int CustomerId { get; set; }

    public int PolicyId { get; set; }

    public DateTime? PurchaseDate { get; set; }

    public DateTime? ExpiryDate { get; set; }

    public string Status { get; set; } = "Active";

    public decimal PremiumAmount { get; set; }

    public string? PaymentFrequency { get; set; }

    public DateTime? LastPaymentDate { get; set; }

    public DateTime? NextPaymentDueDate { get; set; }

    public string? Remarks { get; set; }

    public bool IsActive { get; set; } = true;
}
