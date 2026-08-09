  using System.Data;
  namespace LicInsurance.Api.Repositories.Connections;
   public interface IDbConnectionFactory
   {
       IDbConnection CreateConnection();
   }