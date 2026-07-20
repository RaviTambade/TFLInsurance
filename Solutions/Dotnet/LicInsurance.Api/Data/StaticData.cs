using LicInsurance.Api.Entities;

namespace LicInsurance.Api.Data;

public static class StaticData
{
    public static List<User> Users = new()
    {
        new User
        {
            Id=1,
            FirstName="System",
            LastName="Admin",
            Username="admin",
            Password="password123",
            Email="admin@lic.com",
            MobileNumber="9000000001",
            Role="Admin"
        },

        new User
        {
            Id=2,
            FirstName="Rajesh",
            LastName="Manager",
            Username="manager",
            Password="password123",
            Email="manager@lic.com",
            MobileNumber="9000000002",
            Role="Manager"
        },

        new User
        {
            Id=3,
            FirstName="Priya",
            LastName="Sharma",
            Username="customer1",
            Password="password123",
            Email="priya@gmail.com",
            MobileNumber="9876543210",
            Role="Customer"
        },

        new User
        {
            Id=4,
            FirstName="Amit",
            LastName="Patil",
            Username="agent1",
            Password="password123",
            Email="agent1@gmail.com",
            MobileNumber="9876543211",
            Role="Agent"
        }
    };
}