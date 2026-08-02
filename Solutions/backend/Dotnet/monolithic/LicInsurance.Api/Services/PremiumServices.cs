using LicInsurance.Api.Models;
using LicInsurance.Api.Repositories.Interfaces;
using LicInsurance.Api.Services.Interfaces;
using TFLInsurance.LicInsurance.Repositories.Interfaces;

namespace LicInsurance.Api.Services
{
    public class PremiumServices : IPremiumServices
    {
        private readonly IPremiumRepository _premiumRepository;

        public PremiumServices(IPremiumRepository repository)
        {
            _premiumRepository = repository;
        }

        public List<Premium> GetPedPremiumsByPolicyId(int policyId)
        {
            return _premiumRepository.GetPedPremiumsByPolicyId(policyId);
        }

        public List<Premium> GetPendingAllPremiumsByPolicyId(int policyId)
        {
            return _premiumRepository.GetPendingAllPremiumsByPolicyId(policyId);
        }

        public bool PayPremium(long policyNumber, decimal amount)
        {
            return _premiumRepository.PayPremium(policyNumber, amount);
        }
    }
}
