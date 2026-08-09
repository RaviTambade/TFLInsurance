using LicInsurance.Api.Data.Constant;
using LicInsurance.Api.Data.Constants;
using LicInsurance.Api.Models;
using LicInsurance.Api.Repositories.Dapper;
using LicInsurance.Api.Repositories.Interfaces;

namespace LicInsurance.Api.Repositories
{
    public class PremiumRepository : IPremiumRepository
    {
        private readonly IDapperfactory _dapper;

        public PremiumRepository(IDapperfactory dapper)
        {
            _dapper = dapper;
        }

        public List<Premium> GetPedPremiumsByPolicyId(int policyId)
        {
            return _dapper.Query<Premium>(
                PremiumStoredProcedure.GetPedPremiumsByPolicyId)
                .ToList();
        }

        public List<Premium> GetPendingAllPremiumsByPolicyId(int policyId)
        {
            return _dapper.Query<Premium>(
                PremiumStoredProcedure.GetPendingAllPremiumsByPolicyId)
                .ToList();
        }

        public bool PayPremium(long policyNumber, decimal amount)
        {
            var _result = _dapper.Execute(
                 PremiumStoredProcedure.PayPremium,
                 new
                 {
                     PolicyNumber = policyNumber,
                     AmountPaid = amount
                 });

            return _result > 0;
        }
    }
}
