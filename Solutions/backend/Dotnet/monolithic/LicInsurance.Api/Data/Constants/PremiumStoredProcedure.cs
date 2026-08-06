using LicInsurance.Api.Models;

namespace LicInsurance.Api.Data.Constants
{
    public static class PremiumStoredProcedure
    {
        public const string PayPremium = "sp_PayPremium";
        public const string GetPedPremiumsByPolicyId = "sp_GetPedPremiumsByPolicyId";
        public const string GetPendingAllPremiumsByPolicyId = "sp_GetPendingAllPremiumsByPolicyId";
    }
}
