
using LicInsurance.Api.Data.Connection;
using System.Data;
using Dapper;

namespace LicInsurance.Api.Data.Dapper;

 public class DapperHelper : IDapperHelper
 {
     private readonly IDbConnectionHelper _factory;

     public DapperHelper(IDbConnectionHelper factory)
     {
         _factory = factory;
     }

     public T QueryFirstOrDefault<T>( string sql, object? param = null, CommandType commandType = CommandType.StoredProcedure)
     {
         using var connection = _factory.CreateConnection();
         return connection.QueryFirstOrDefault<T>( sql, param,commandType: commandType);
     }

     public IEnumerable<T> Query<T>(string sql, object? param = null, CommandType commandType = CommandType.StoredProcedure)
     {
         using var connection = _factory.CreateConnection();
         return connection.Query<T>( sql, param,commandType: commandType);
     }

     public int Execute(string sql, object? param = null,CommandType commandType = CommandType.StoredProcedure)
     {
         using var connection = _factory.CreateConnection();
         return connection.Execute(sql,param, commandType: commandType);
     }

     public T QuerySingle<T>(
         string sql,
         object? param = null,
         CommandType commandType = CommandType.StoredProcedure)
     {
         using var connection = _factory.CreateConnection();
         return connection.QuerySingle<T>( sql, param,commandType: commandType);
     }
 }