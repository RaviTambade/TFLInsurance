namespace LicInsurance.Api.DTOs
{
    public class CreateClaimRequestDto
    {
        public string PolicyNumber { get; set; } = string.Empty;

        public int CustomerId { get; set; }

        public DateTime ClaimDate { get; set; }

        public string ClaimType { get; set; } = string.Empty;

        public string? Reason { get; set; }

        public decimal ClaimAmount { get; set; }
    }
}
