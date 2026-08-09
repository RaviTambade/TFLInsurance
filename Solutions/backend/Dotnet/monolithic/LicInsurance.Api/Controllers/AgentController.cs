using Microsoft.AspNetCore.Mvc;

namespace TFLInsurance.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgentsController : ControllerBase
    {
        // ==========================================
        // Agent Management
        // ==========================================

        [HttpPost]
        public IActionResult RegisterAgent()
        {
            return Ok();
        }

        [HttpGet]
        public IActionResult GetAgents()
        {
            return Ok();
        }

        [HttpGet("{agentId}")]
        public IActionResult GetAgent(int agentId)
        {
            return Ok();
        }

        [HttpPut("{agentId}")]
        public IActionResult UpdateAgent(int agentId)
        {
            return Ok();
        }

        [HttpDelete("{agentId}")]
        public IActionResult RemoveAgent(int agentId)
        {
            return Ok();
        }

        // ==========================================
        // Agent Profile
        // ==========================================

        [HttpGet("{agentId}/profile")]
        public IActionResult GetProfile(int agentId)
        {
            return Ok();
        }

        [HttpPut("{agentId}/profile")]
        public IActionResult UpdateProfile(int agentId)
        {
            return Ok();
        }

        // ==========================================
        // Customer Management
        // ==========================================

        [HttpPost("{agentId}/customers")]
        public IActionResult RegisterCustomer(int agentId)
        {
            return Ok();
        }

        [HttpGet("{agentId}/customers")]
        public IActionResult GetAssignedCustomers(int agentId)
        {
            return Ok();
        }

        [HttpGet("{agentId}/customers/{customerId}")]
        public IActionResult GetCustomer(int agentId, int customerId)
        {
            return Ok();
        }

        [HttpPost("{agentId}/customers/{customerId}/assign")]
        public IActionResult AssignCustomer(int agentId, int customerId)
        {
            return Ok();
        }

        // ==========================================
        // Policy Sales
        // ==========================================

        [HttpGet("policies")]
        public IActionResult GetAvailablePolicies()
        {
            return Ok();
        }

        [HttpPost("{agentId}/customers/{customerId}/purchase/{policyId}")]
        public IActionResult SellPolicy(int agentId, int customerId, int policyId)
        {
            return Ok();
        }

        [HttpGet("{agentId}/sales")]
        public IActionResult GetPolicySales(int agentId)
        {
            return Ok();
        }

        [HttpGet("{agentId}/customers/{customerId}/policies")]
        public IActionResult GetCustomerPolicies(int agentId, int customerId)
        {
            return Ok();
        }

        // ==========================================
        // Premium Follow-up
        // ==========================================

        [HttpGet("{agentId}/premiums/due")]
        public IActionResult GetDuePremiums(int agentId)
        {
            return Ok();
        }

        [HttpPost("{agentId}/premiums/{paymentId}/remind")]
        public IActionResult SendPremiumReminder(int agentId, int paymentId)
        {
            return Ok();
        }

        // ==========================================
        // Claim Assistance
        // ==========================================

        [HttpPost("{agentId}/customers/{customerId}/claims")]
        public IActionResult RegisterClaim(int agentId, int customerId)
        {
            return Ok();
        }

        [HttpGet("{agentId}/claims")]
        public IActionResult GetClaimsHandled(int agentId)
        {
            return Ok();
        }

        [HttpGet("{agentId}/customers/{customerId}/claims")]
        public IActionResult GetCustomerClaims(int agentId, int customerId)
        {
            return Ok();
        }

        // ==========================================
        // Commission
        // ==========================================

        [HttpGet("{agentId}/commissions")]
        public IActionResult GetCommissionHistory(int agentId)
        {
            return Ok();
        }

        [HttpGet("{agentId}/commissions/pending")]
        public IActionResult GetPendingCommissions(int agentId)
        {
            return Ok();
        }

        [HttpGet("{agentId}/commissions/monthly")]
        public IActionResult GetMonthlyCommission(int agentId)
        {
            return Ok();
        }

        // ==========================================
        // Performance Dashboard
        // ==========================================

        [HttpGet("{agentId}/dashboard")]
        public IActionResult GetDashboard(int agentId)
        {
            return Ok();
        }

        [HttpGet("{agentId}/performance")]
        public IActionResult GetPerformance(int agentId)
        {
            return Ok();
        }

        [HttpGet("{agentId}/targets")]
        public IActionResult GetSalesTargets(int agentId)
        {
            return Ok();
        }

        // ==========================================
        // Reports
        // ==========================================

        [HttpGet("{agentId}/reports/sales")]
        public IActionResult SalesReport(int agentId)
        {
            return Ok();
        }

        [HttpGet("{agentId}/reports/customers")]
        public IActionResult CustomerReport(int agentId)
        {
            return Ok();
        }

        [HttpGet("{agentId}/reports/claims")]
        public IActionResult ClaimReport(int agentId)
        {
            return Ok();
        }

        [HttpGet("{agentId}/reports/premium")]
        public IActionResult PremiumCollectionReport(int agentId)
        {
            return Ok();
        }
    }
}