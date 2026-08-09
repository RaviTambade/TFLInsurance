using System.Data;
using Dapper;
using LicInsurance.Api.Repositories.Connections;

namespace LicInsurance.Api.Repositories.Dapper;

 public class Dapperfactory : IDapperfactory
 {
     private readonly IDbConnectionFactory _factory;

     public Dapperfactory(IDbConnectionFactory factory)
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
    public async Task<IEnumerable<T>> QueryAsync<T>(
    string sql,
    object? param = null,
    CommandType commandType = CommandType.StoredProcedure)
    {
        using var connection = _factory.CreateConnection();

        return await connection.QueryAsync<T>(
            sql,
            param,
            commandType: commandType);
    }
    public async Task<T?> QueryFirstOrDefaultAsync<T>(
    string sql,
    object? param = null,
    CommandType commandType = CommandType.StoredProcedure)
    {
        using var connection = _factory.CreateConnection();

        return await connection.QueryFirstOrDefaultAsync<T>(
            sql,
            param,
            commandType: commandType);
    }
    public async Task<int> ExecuteAsync(
    string sql,
    object? param = null,
    CommandType commandType = CommandType.StoredProcedure)
    {
        using var connection = _factory.CreateConnection();

        return await connection.ExecuteAsync(
            sql,
            param,
            commandType: commandType);
    }
}