namespace LicInsurance.Api.DTOs
{
    public class ApproveClaimRequestDto
    {
        public decimal ApprovedAmount { get; set; }

        public string? Remarks { get; set; }
    }
}
