namespace LicInsurance.Api.Data.Constant;

public static class CustomerPoliciesStoredProcedure
{
    // Basic CRUD operations
    public const string CUSTOMER_POLICY_SAVE = "USP_CUSTOMER_POLICY_SAVE";
    public const string CUSTOMER_POLICY_UPDATE = "USP_CUSTOMER_POLICY_UPDATE";
    public const string CUSTOMER_POLICY_GET_ALL = "USP_CUSTOMER_POLICY_GET_ALL";
    public const string CUSTOMER_POLICY_GET_BY_ID = "USP_CUSTOMER_POLICY_GET_BY_ID";
    public const string CUSTOMER_POLICY_DELETE = "USP_CUSTOMER_POLICY_DELETE";

    // Filter by Customer
    public const string CUSTOMER_POLICY_GET_BY_CUSTOMER_ID = "USP_CUSTOMER_POLICY_GET_BY_CUSTOMER_ID";

    // Filter by Status
    public const string CUSTOMER_POLICY_GET_BY_CUSTOMER_AND_STATUS = "USP_CUSTOMER_POLICY_GET_BY_CUSTOMER_AND_STATUS";

    // Renewal
    public const string CUSTOMER_POLICY_RENEW = "USP_CUSTOMER_POLICY_RENEW";
}
