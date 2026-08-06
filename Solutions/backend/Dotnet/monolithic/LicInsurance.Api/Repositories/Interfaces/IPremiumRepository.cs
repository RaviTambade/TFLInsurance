using LicInsurance.Api.Models;

namespace LicInsurance.Api.Repositories.Interfaces
{
    public interface IPremiumRepository
    {
        bool PayPremium(long policyNumber, decimal amount);

        List<Premium> GetPedPremiumsByPolicyId(int policyId);

        List<Premium> GetPendingAllPremiumsByPolicyId(int policyId);
    }
}
