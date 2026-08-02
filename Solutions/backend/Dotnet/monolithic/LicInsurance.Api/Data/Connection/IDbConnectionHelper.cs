  using System.Data;
  namespace LicInsurance.Api.Data.Connection;
   public interface IDbConnectionHelper
   {
       IDbConnection CreateConnection();
   }