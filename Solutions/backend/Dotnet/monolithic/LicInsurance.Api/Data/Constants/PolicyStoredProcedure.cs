namespace LicInsurance.Api.Data.Constant;

public static class PolicyStoredProcedure
{
    public const string POLICY_SAVE = "USP_POLICY_CREATE";
    public const string POLICY_UPDATE = "USP_POLICY_UPDATE";
    public const string POLICY_GET_ALL = "USP_POLICY_GET_ALL";
    public const string POLICY_GET_BY_ID = "USP_POLICY_GET_BY_ID";
    public const string POLICY_GET_BY_CUSTOMER_ID = "USP_POLICY_GET_BY_CUSTOMER_ID";
    public const string POLICY_GET_BY_AGENT_ID = "USP_POLICY_GET_BY_AGENT_ID";
    public const string POLICY_UPDATE_RENEWAL = "USP_POLICY_UPDATE_RENEWAL";
    public const string POLICY_DELETE = "USP_POLICY_DELETE";
}
