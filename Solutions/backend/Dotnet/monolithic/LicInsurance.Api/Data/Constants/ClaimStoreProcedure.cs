namespace LicInsurance.Api.Data.Constant;

public static class ClaimStoredProcedure
{
    public const string CLAIM_GET_ALL = "sp_claim_get_all";

    public const string CLAIM_GET_BY_ID = "sp_claim_get_by_id";

    public const string CLAIM_GET_BY_CUSTOMER = "sp_claim_get_by_customer";

    public const string CLAIM_SAVE = "sp_claim_save";

    public const string CLAIM_UPDATE = "sp_claim_update";

    public const string CLAIM_CHANGE_STATUS = "sp_claim_change_status";

    public const string CLAIM_APPROVE = "sp_claim_approve";

    public const string CLAIM_REJECT = "sp_claim_reject";
}