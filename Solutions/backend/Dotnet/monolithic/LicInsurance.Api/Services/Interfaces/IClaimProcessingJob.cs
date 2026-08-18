namespace LicInsurance.Api.Services.Interfaces
{
    public interface IClaimProcessingJob
    {
        Task ProcessClaimAsync(int claimId);
    }
}
