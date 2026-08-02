 using MySqlConnector;
 using System.Data;
 

namespace LicInsurance.Api.Data.Connection;     


public sealed class DbConnectionHelper : IDbConnectionHelper
{
    private readonly IConfiguration _configuration;

    public DbConnectionHelper(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    IDbConnection IDbConnectionHelper.CreateConnection()
    {
        return new MySqlConnection(_configuration.GetConnectionString("DefaultConnection"));
    }
}