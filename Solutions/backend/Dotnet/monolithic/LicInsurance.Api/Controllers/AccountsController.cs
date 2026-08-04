using Microsoft.AspNetCore.Mvc;

namespace TFLInsurance.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        // -----------------------------
        // Policy Purchase Payments
        // -----------------------------

        [HttpPost("policy-purchase/payment")]
        public IActionResult MakePolicyPurchasePayment()
        {
            return Ok();
        }

        [HttpGet("policy-purchase/payments")]
        public IActionResult GetPolicyPurchasePayments()
        {
            return Ok();
        }

        [HttpGet("policy-purchase/payment/{id}")]
        public IActionResult GetPolicyPurchasePayment(int id)
        {
            return Ok();
        }

        [HttpPut("policy-purchase/payment/{id}")]
        public IActionResult UpdatePolicyPurchasePayment(int id)
        {
            return Ok();
        }

        [HttpDelete("policy-purchase/payment/{id}")]
        public IActionResult DeletePolicyPurchasePayment(int id)
        {
            return Ok();
        }

        // -----------------------------
        // Premium Payments
        // -----------------------------

        [HttpPost("premium/payment")]
        public IActionResult PayPremium()
        {
            return Ok();
        }

        [HttpGet("premium/payments")]
        public IActionResult GetPremiumPayments()
        {
            return Ok();
        }

        [HttpGet("premium/payment/{id}")]
        public IActionResult GetPremiumPayment(int id)
        {
            return Ok();
        }

        [HttpPut("premium/payment/{id}")]
        public IActionResult UpdatePremiumPayment(int id)
        {
            return Ok();
        }

        [HttpDelete("premium/payment/{id}")]
        public IActionResult DeletePremiumPayment(int id)
        {
            return Ok();
        }

        // -----------------------------
        // Receipts
        // -----------------------------

        [HttpGet("receipt/{paymentId}")]
        public IActionResult GenerateReceipt(int paymentId)
        {
            return Ok();
        }

        [HttpGet("customer/{customerId}/receipts")]
        public IActionResult GetCustomerReceipts(int customerId)
        {
            return Ok();
        }

        // -----------------------------
        // Customer Statement
        // -----------------------------

        [HttpGet("customer/{customerId}/statement")]
        public IActionResult GetCustomerStatement(int customerId)
        {
            return Ok();
        }

        [HttpGet("customer/{customerId}/balance")]
        public IActionResult GetOutstandingBalance(int customerId)
        {
            return Ok();
        }

        // -----------------------------
        // Refunds
        // -----------------------------

        [HttpPost("refund")]
        public IActionResult RefundPolicy()
        {
            return Ok();
        }

        [HttpGet("refunds")]
        public IActionResult GetRefundHistory()
        {
            return Ok();
        }

        // -----------------------------
        // Claim Settlement
        // -----------------------------

        [HttpPost("claim/payment")]
        public IActionResult ReleaseClaimPayment()
        {
            return Ok();
        }

        [HttpGet("claim/payments")]
        public IActionResult GetClaimPayments()
        {
            return Ok();
        }

        // -----------------------------
        // Reports
        // -----------------------------

        [HttpGet("reports/daily")]
        public IActionResult DailyCollections()
        {
            return Ok();
        }

        [HttpGet("reports/monthly")]
        public IActionResult MonthlyCollections()
        {
            return Ok();
        }

        [HttpGet("reports/yearly")]
        public IActionResult YearlyCollections()
        {
            return Ok();
        }

        [HttpGet("reports/pending")]
        public IActionResult PendingPayments()
        {
            return Ok();
        }

        [HttpGet("reports/overdue")]
        public IActionResult OverduePremiums()
        {
            return Ok();
        }
    }
}