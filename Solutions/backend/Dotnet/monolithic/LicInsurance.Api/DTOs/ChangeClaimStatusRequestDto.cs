namespace LicInsurance.Api.DTOs
{
    public class ChangeClaimStatusRequestDto
    {
        public string Status { get; set; } = string.Empty;

        public string? Remarks { get; set; }
    }
}
