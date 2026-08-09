using LicInsurance.Api.Models;

namespace LicInsurance.Api.Services.Interfaces
{
    public interface IPremiumServices
    {
        bool PayPremium(long policyNumber, decimal amount);

        List<Premium> GetPedPremiumsByPolicyId(int policyId);

        List<Premium> GetPendingAllPremiumsByPolicyId(int policyId);
    }
}
