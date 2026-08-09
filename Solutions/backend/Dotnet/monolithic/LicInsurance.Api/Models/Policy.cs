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

    /// <summary>
    /// Navigation property to Customer
    /// </summary>
    [NotMapped]
    public virtual Customer? Customer { get; set; }

    /// <summary>
    /// Navigation property for customer policies
    /// Represents one-to-many relationship: One Policy can belong to One Customer
    /// </summary>
    [NotMapped]
    public virtual ICollection<CustomerPolicy>? CustomerPolicies { get; set; }
}
