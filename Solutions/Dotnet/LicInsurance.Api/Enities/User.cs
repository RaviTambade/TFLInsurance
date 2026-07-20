using System.Text.Json.Serialization;

namespace LicInsurance.Api.Entities
{
    public class User
    {
        public int Id{get;set;}
        public string FirstName{get;set;}

        public string LastName{get;set;}

        public string Username{get;set;}

        [JsonIgnore]
        public string Password { get; set; }

        public string Role { get; set; }
        public string Token { get; set; }

        public string Email { get; set; }
        public string MobileNumber { get; set; }

    }
}