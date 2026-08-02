using System.Data;
namespace LicInsurance.Api.Data.Dapper;

public interface IDapperHelper
{

    T QueryFirstOrDefault<T>(
        string sql,
        object? param = null,
        CommandType commandType = CommandType.StoredProcedure);

    IEnumerable<T> Query<T>(
        string sql,
        object? param = null,
        CommandType commandType = CommandType.StoredProcedure);

    int Execute(
        string sql,
        object? param = null,
        CommandType commandType = CommandType.StoredProcedure);

    T QuerySingle<T>(
        string sql,
        object? param = null,
        CommandType commandType = CommandType.StoredProcedure);
}