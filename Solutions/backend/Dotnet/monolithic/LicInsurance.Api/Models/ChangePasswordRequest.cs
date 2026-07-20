namespace LicInsurance.Api.Models;
public class ChangePasswordRequest
{
    public string OldPassword { get; set; }="";
    public string NewPassword { get; set; }="";

    public string Username { get; set; } = "";
}