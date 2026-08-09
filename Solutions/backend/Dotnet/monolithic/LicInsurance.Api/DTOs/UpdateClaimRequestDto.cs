namespace LicInsurance.Api.DTOs
{
    public class UpdateClaimRequestDto
    {
        public string ClaimType { get; set; } = string.Empty;

        public string? Reason { get; set; }

        public decimal ClaimAmount { get; set; }

        public string? Remarks { get; set; }
    }
}
