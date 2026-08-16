namespace LicInsurance.Api.DTOs;

public class AgentsDto
{
    public string AgentId { get; set; } = string.Empty;

    public string AgentCode { get; set; } = string.Empty;

    public string? FullName { get; set; }
}