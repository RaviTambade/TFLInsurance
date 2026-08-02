namespace LicInsurance.Api.Models
{
    public class Premium
    {
        public int PremiumId { get; set; }

        public int PolicyId { get; set; }

        public int CustomerId { get; set; }

        public decimal AmountPaid { get; set; }

        public DateTime PaymentDate { get; set; }

        public string PaymentMode { get; set; } = string.Empty;

        public string TransactionId { get; set; } = string.Empty;

        public string PaymentFrequency { get; set; } = string.Empty;

        public string? PaymentStatus { get; set; }

        public string? Remarks { get; set; }
    }
}
