namespace JudeAPI.Models
{
    public interface IJwtAuth
    {
        string Authentication(string userID, string roleID);
        //string Authentication();
    }
}
