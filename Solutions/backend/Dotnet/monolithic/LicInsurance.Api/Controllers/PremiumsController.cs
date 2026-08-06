using Microsoft.AspNetCore.Mvc;
using LicInsurance.Api.Services.Interfaces;

namespace LicInsurance.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PremiumsController : ControllerBase
{
    private readonly IPremiumServices _premiumServices;

    public PremiumsController(IPremiumServices premiumServices)
    {
        _premiumServices = premiumServices;
    }

    [HttpGet]
    [Route("getpedpremium")]
    public IActionResult GetPedPremiumsByPolicyId(int policyId)
    {
        var premiums = _premiumServices.GetPedPremiumsByPolicyId(policyId);
        return Ok(premiums);
    }

    [HttpGet]
    [Route("getpendingallpremium")]
    public IActionResult GetPendingAllPremiumsByPolicyId(int policyId)
    {
        var premiums = _premiumServices.GetPendingAllPremiumsByPolicyId(policyId);
        return Ok(premiums);
    }

    [HttpGet]
    [Route("paypremium")]
    public IActionResult PayPremium(long policyNumber,decimal amount)
    {
        var premiums = _premiumServices.PayPremium(policyNumber,amount);
        return Ok(premiums);
    }

        // ==========================================
        // Premium Calculation
        // ==========================================

        // Calculate premium for a policy
        [HttpGet("calculate/{policyId}")]
        public IActionResult CalculatePremium(int policyId)
        {
            return Ok();
        }

        // Generate premium schedule
        [HttpPost("schedule")]
        public IActionResult GeneratePremiumSchedule()
        {
            return Ok();
        }

        // View premium schedule
        [HttpGet("schedule/{policyId}")]
        public IActionResult GetPremiumSchedule(int policyId)
        {
            return Ok();
        }

        // ==========================================
        // Premium Payments
        // ==========================================

        // Pay premium
        [HttpPost("payment")]
        public IActionResult PayPremium()
        {
            return Ok();
        }

        // Update payment
        [HttpPut("payment/{paymentId}")]
        public IActionResult UpdatePremiumPayment(int paymentId)
        {
            return Ok();
        }

        // Cancel payment
        [HttpDelete("payment/{paymentId}")]
        public IActionResult CancelPremiumPayment(int paymentId)
        {
            return Ok();
        }

        // Premium payment details
        [HttpGet("payment/{paymentId}")]
        public IActionResult GetPremiumPayment(int paymentId)
        {
            return Ok();
        }

        // ==========================================
        // Customer Premiums
        // ==========================================

        [HttpGet("customer/{customerId}")]
        public IActionResult GetCustomerPremiums(int customerId)
        {
            return Ok();
        }

        [HttpGet("customer/{customerId}/history")]
        public IActionResult GetPremiumPaymentHistory(int customerId)
        {
            return Ok();
        }

        [HttpGet("policy/{policyId}")]
        public IActionResult GetPolicyPremiums(int policyId)
        {
            return Ok();
        }

        // ==========================================
        // Due Premiums
        // ==========================================

        [HttpGet("due")]
        public IActionResult GetDuePremiums()
        {
            return Ok();
        }

        [HttpGet("overdue")]
        public IActionResult GetOverduePremiums()
        {
            return Ok();
        }

        [HttpGet("customer/{customerId}/due")]
        public IActionResult GetCustomerDuePremiums(int customerId)
        {
            return Ok();
        }

        [HttpGet("customer/{customerId}/overdue")]
        public IActionResult GetCustomerOverduePremiums(int customerId)
        {
            return Ok();
        }

        // ==========================================
        // Penalty & Interest
        // ==========================================

        [HttpPost("calculate-penalty/{policyId}")]
        public IActionResult CalculateLatePenalty(int policyId)
        {
            return Ok();
        }

        [HttpPost("waive-penalty/{paymentId}")]
        public IActionResult WaivePenalty(int paymentId)
        {
            return Ok();
        }

        // ==========================================
        // Policy Renewal
        // ==========================================

        [HttpPost("renew/{policyId}")]
        public IActionResult RenewPolicy(int policyId)
        {
            return Ok();
        }

        [HttpGet("renewals")]
        public IActionResult GetUpcomingRenewals()
        {
            return Ok();
        }

        // ==========================================
        // Receipts
        // ==========================================

        [HttpGet("receipt/{paymentId}")]
        public IActionResult GeneratePremiumReceipt(int paymentId)
        {
            return Ok();
        }

        // ==========================================
        // Dashboard
        // ==========================================

        [HttpGet]
        public IActionResult GetAllPremiumPayments()
        {
            return Ok();
        }

        [HttpGet("pending")]
        public IActionResult GetPendingPremiumPayments()
        {
            return Ok();
        }

        [HttpGet("successful")]
        public IActionResult GetSuccessfulPremiumPayments()
        {
            return Ok();
        }

        [HttpGet("failed")]
        public IActionResult GetFailedPremiumPayments()
        {
            return Ok();
        }

        // ==========================================
        // Reports
        // ==========================================

        [HttpGet("reports/daily")]
        public IActionResult DailyPremiumCollection()
        {
            return Ok();
        }

        [HttpGet("reports/monthly")]
        public IActionResult MonthlyPremiumCollection()
        {
            return Ok();
        }

        [HttpGet("reports/yearly")]
        public IActionResult YearlyPremiumCollection()
        {
            return Ok();
        }

        [HttpGet("reports/outstanding")]
        public IActionResult OutstandingPremiumReport()
        {
            return Ok();
        }

        [HttpGet("reports/customer/{customerId}")]
        public IActionResult CustomerPremiumStatement(int customerId)
        {
            return Ok();
        }
    }

