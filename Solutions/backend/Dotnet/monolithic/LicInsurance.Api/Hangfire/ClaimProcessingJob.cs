using LicInsurance.Api.Services.Interfaces;
using TFLInsurance.Licinsruance.Services.Interfaces;

namespace LicInsurance.Api.Hangfire
{
    public class ClaimProcessingJob : IClaimProcessingJob
    {
        private readonly IClaimService _claimService;
        private readonly ILogger<ClaimProcessingJob> _logger;

        public ClaimProcessingJob(
            IClaimService claimService,
            ILogger<ClaimProcessingJob> logger)
        {
            _claimService = claimService;
            _logger = logger;
        }

        public async Task ProcessClaimAsync(int claimId)
        {
            try
            {
                _logger.LogInformation(
                    "Hangfire started processing ClaimId: {ClaimId}",
                    claimId);

                await _claimService.ProcessClaimAsync(claimId);

                _logger.LogInformation(
                    "Hangfire completed processing ClaimId: {ClaimId}",
                    claimId);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Hangfire failed processing ClaimId: {ClaimId}",
                    claimId);

                // Very important:
                // Let Hangfire know that the job failed.
                throw;
            }
        }
    }
}
