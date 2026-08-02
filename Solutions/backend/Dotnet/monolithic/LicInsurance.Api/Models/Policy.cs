using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LicInsurance.Api.Models;

[Table("policies")]
public class Policy
{
    public int PolicyId { get; set; }
    public string PolicyNumber { get; set; } = string.Empty;
    public int CustomerId { get; set; }
    public int? AgentId { get; set; }
    public int? EmployeeId { get; set; }
    public string PolicyType { get; set; } = string.Empty;
    public decimal PolicyAmount { get; set; }
    public bool IsRenewed { get; set; }
}