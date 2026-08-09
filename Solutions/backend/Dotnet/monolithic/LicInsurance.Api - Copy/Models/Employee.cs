namespace LicInsurance.Api.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }

        public int? UserId { get; set; }

        public string EmployeeCode { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string MobileNumber { get; set; } = string.Empty;

        public string Department { get; set; } = string.Empty;

        public string Designation { get; set; } = string.Empty;

        public DateTime DateOfJoining { get; set; }

        public decimal? Salary { get; set; }

        public bool IsActive { get; set; }

        public string? Address { get; set; }
    }
}
