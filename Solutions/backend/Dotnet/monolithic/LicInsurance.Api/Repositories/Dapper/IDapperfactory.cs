using System.Data;
namespace LicInsurance.Api.Repositories.Dapper;

public interface IDapperfactory
{
    T QueryFirstOrDefault<T>( string sql,object? param = null, CommandType commandType = CommandType.StoredProcedure);
    IEnumerable<T> Query<T>(string sql, object? param = null, CommandType commandType = CommandType.StoredProcedure);
    int Execute(string sql, object? param = null, CommandType commandType = CommandType.StoredProcedure);
    T QuerySingle<T>( string sql, object? param = null, CommandType commandType = CommandType.StoredProcedure);

    // Async methods
    Task<IEnumerable<T>> QueryAsync<T>(
        string sql,
        object? param = null,
        CommandType commandType = CommandType.StoredProcedure);

    Task<T?> QueryFirstOrDefaultAsync<T>(
        string sql,
        object? param = null,
        CommandType commandType = CommandType.StoredProcedure);

    Task<int> ExecuteAsync(
        string sql,
        object? param = null,
        CommandType commandType = CommandType.StoredProcedure);
}