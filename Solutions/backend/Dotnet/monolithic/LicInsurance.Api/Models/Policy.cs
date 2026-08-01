namespace LicInsurance.Api.Models;

public class Policy
{
    public int policy_id { get; set; }
    public string policy_name { get; set; }
    public string policy_type { get; set; }
    public string description { get; set; }
    public Decimal minimum_sum_assured { get; set; }
     public Decimal maximum_sum_assured { get; set; }
    public int minimum_duration { get; set; }
    public int maximum_duration { get; set; }
    public bool is_active { get; set; }
    public DateTime created_on { get; set; }
    public string CreatedBy { get; set; }
   public DateTime Updated_on { get; set; }
    public string UpdatedBy { get; set; }

}