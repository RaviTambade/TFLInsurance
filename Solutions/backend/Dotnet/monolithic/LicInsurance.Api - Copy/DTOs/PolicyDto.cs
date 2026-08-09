namespace LicInsurance.Api.DTOs;

public class PolicyDto
{
    public string PolicyName { get; set; } = string.Empty;

    public string PolicyType { get; set; } = string.Empty;

    public string? Description { get; set; }
}