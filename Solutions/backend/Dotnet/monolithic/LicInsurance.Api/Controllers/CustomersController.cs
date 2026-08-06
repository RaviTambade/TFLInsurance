using Microsoft.AspNetCore.Mvc;
using LicInsurance.Api.Models;
using LicInsurance.Api.Services;

namespace LicInsurance.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_customerService.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var customer = _customerService.GetById(id);
            if (customer == null)
            {
                return NotFound(new { message = "Customer not found" });
            }

            return Ok(customer);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdCustomer = _customerService.Create(customer);
            return CreatedAtAction(nameof(GetById), new { id = createdCustomer.CustomerId }, createdCustomer);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedCustomer = _customerService.Update(id, customer);
            if (updatedCustomer == null)
            {
                return NotFound(new { message = "Customer not found" });
            }

            return Ok(updatedCustomer);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted = _customerService.Delete(id);
            if (!deleted)
            {
                return NotFound(new { message = "Customer not found" });
            }

            return NoContent();
        }
   
        // ==========================================
        // Customer Registration
        // ==========================================

        [HttpPost]
        public IActionResult RegisterCustomer()
        {
            return Ok();
        }

        [HttpGet]
        public IActionResult GetCustomers()
        {
            return Ok();
        }

        [HttpGet("{customerId}")]
        public IActionResult GetCustomer(int customerId)
        {
            return Ok();
        }

        [HttpPut("{customerId}")]
        public IActionResult UpdateCustomer(int customerId)
        {
            return Ok();
        }

        [HttpDelete("{customerId}")]
        public IActionResult DeleteCustomer(int customerId)
        {
            return Ok();
        }

        // ==========================================
        // Customer Profile
        // ==========================================

        [HttpGet("{customerId}/profile")]
        public IActionResult GetCustomerProfile(int customerId)
        {
            return Ok();
        }

        [HttpPut("{customerId}/profile")]
        public IActionResult UpdateCustomerProfile(int customerId)
        {
            return Ok();
        }

        [HttpPut("{customerId}/address")]
        public IActionResult UpdateAddress(int customerId)
        {
            return Ok();
        }

        [HttpPut("{customerId}/contact")]
        public IActionResult UpdateContactInformation(int customerId)
        {
            return Ok();
        }

        // ==========================================
        // Nominee Management
        // ==========================================

        [HttpPost("{customerId}/nominees")]
        public IActionResult AddNominee(int customerId)
        {
            return Ok();
        }

        [HttpGet("{customerId}/nominees")]
        public IActionResult GetNominees(int customerId)
        {
            return Ok();
        }

        [HttpPut("{customerId}/nominees/{nomineeId}")]
        public IActionResult UpdateNominee(int customerId, int nomineeId)
        {
            return Ok();
        }

        [HttpDelete("{customerId}/nominees/{nomineeId}")]
        public IActionResult DeleteNominee(int customerId, int nomineeId)
        {
            return Ok();
        }

        // ==========================================
        // Customer Policies
        // ==========================================

        [HttpPost("{customerId}/policies/{policyId}/purchase")]
        public IActionResult PurchasePolicy(int customerId, int policyId)
        {
            return Ok();
        }

        [HttpGet("{customerId}/policies")]
        public IActionResult GetCustomerPolicies(int customerId)
        {
            return Ok();
        }

        [HttpGet("{customerId}/policies/active")]
        public IActionResult GetActivePolicies(int customerId)
        {
            return Ok();
        }

        [HttpGet("{customerId}/policies/expired")]
        public IActionResult GetExpiredPolicies(int customerId)
        {
            return Ok();
        }

        [HttpGet("{customerId}/policies/{policyId}")]
        public IActionResult GetPolicyDetails(int customerId, int policyId)
        {
            return Ok();
        }

        // ==========================================
        // Premiums
        // ==========================================

        [HttpGet("{customerId}/premiums")]
        public IActionResult GetPremiums(int customerId)
        {
            return Ok();
        }

        [HttpGet("{customerId}/premiums/due")]
        public IActionResult GetDuePremiums(int customerId)
        {
            return Ok();
        }

        [HttpGet("{customerId}/premiums/history")]
        public IActionResult GetPremiumHistory(int customerId)
        {
            return Ok();
        }

        // ==========================================
        // Claims
        // ==========================================

        [HttpPost("{customerId}/claims")]
        public IActionResult SubmitClaim(int customerId)
        {
            return Ok();
        }

        [HttpGet("{customerId}/claims")]
        public IActionResult GetClaims(int customerId)
        {
            return Ok();
        }

        [HttpGet("{customerId}/claims/{claimId}")]
        public IActionResult GetClaim(int customerId, int claimId)
        {
            return Ok();
        }

        [HttpGet("{customerId}/claims/{claimId}/status")]
        public IActionResult GetClaimStatus(int customerId, int claimId)
        {
            return Ok();
        }

        // ==========================================
        // Payments
        // ==========================================

        [HttpGet("{customerId}/payments")]
        public IActionResult GetPaymentHistory(int customerId)
        {
            return Ok();
        }

        [HttpGet("{customerId}/receipts")]
        public IActionResult GetReceipts(int customerId)
        {
            return Ok();
        }

        // ==========================================
        // Dashboard
        // ==========================================

        [HttpGet("{customerId}/dashboard")]
        public IActionResult GetDashboard(int customerId)
        {
            return Ok();
        }

        // ==========================================
        // Reports
        // ==========================================

        [HttpGet("{customerId}/statement")]
        public IActionResult GetAccountStatement(int customerId)
        {
            return Ok();
        }

        [HttpGet("{customerId}/summary")]
        public IActionResult GetInsuranceSummary(int customerId)
        {
            return Ok();
        }
    }
}