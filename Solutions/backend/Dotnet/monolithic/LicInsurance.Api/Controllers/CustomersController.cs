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
        private readonly ILogger<CustomersController> _logger;

        public CustomersController(ICustomerService customerService, ILogger<CustomersController> logger)
        {
            _customerService = customerService;
            _logger = logger;
        }

        // ==========================================
        // Customer Registration
        // ==========================================

        [HttpGet]
        public IActionResult GetCustomers()
        {
            _logger.LogInformation("Fetching all customers.");
            try
            {
                return Ok(_customerService.GetCustomers());
            }
            catch (Exception ex)
            {
                _logger.LogError("Error occurred while creating customer." + ex.Message);
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpGet("{customerId}")]
        public IActionResult GetCustomer(int customerId)
        {
            _logger.LogInformation($"Fetching customer with ID: {customerId}");
            try
            {
                var customer = _customerService.GetCustomerById(customerId);
                if (customer == null)
                {
                    _logger.LogWarning($"Customer with ID: {customerId} not found.");
                    return NotFound(new { message = "Customer not found" });
                }

                _logger.LogInformation($"Customer with ID: {customerId} found.");
                return Ok(customer);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error occurred while fetching customer." + ex.Message);
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost]
        public IActionResult RegisterCustomer([FromBody] Customer customer)
        {
            _logger.LogInformation("Creating a new customer.");
            try
            {
                var createdCustomer = _customerService.RegisterCustomer(customer);
                return Ok(createdCustomer);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error occurred while creating customer." + ex.Message);
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPut("{customerId}")]
        public IActionResult UpdateCustomer(int customerId, [FromBody] Customer customer)
        {
            _logger.LogInformation($"Updating customer with ID: {customerId}");

            try
            {
                var updatedCustomer = _customerService.UpdateCustomer(customerId, customer);
                if (updatedCustomer == false)
                {
                    _logger.LogWarning($"Customer with ID: {customerId} not found.");
                    return NotFound(new { message = "Customer not found" });
                }

                _logger.LogInformation($"Customer with ID: {customerId} updated successfully.");
                return Ok(updatedCustomer);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error occurred while updating customer." + ex.Message);
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("{customerId}")]
        public IActionResult DeleteCustomer(int customerId)
        {
            _logger.LogInformation($"Deleting customer with ID: {customerId}");
            try
            {
                var deleted = _customerService.DeleteCustomer(customerId);
                if (!deleted)
                {
                    _logger.LogWarning($"Customer with ID: {customerId} not found.");
                    return NotFound(new { message = "Customer not found" });
                }

                _logger.LogInformation($"Customer with ID: {customerId} deleted successfully.");
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error occurred while deleting customer." + ex.Message);
                return StatusCode(500, "An error occurred while processing your request.");
            }
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