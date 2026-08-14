namespace LicInsurance.Api.Models.PolicyMaster;

public class PolicyTypeDto
{
    public string PolicyType { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public decimal MinimumAmount { get; set; }

    public decimal MaximumAmount { get; set; }

    public List<string> PremiumFrequency { get; set; } = new();

    public bool Active { get; set; }
}
