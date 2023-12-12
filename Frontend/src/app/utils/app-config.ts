class AppConfig {
    public registerUrl = "http://localhost:4003/api/auth/register/";
    public loginUrl = "http://localhost:4003/api/auth/login/";
    public vacationsUsersUrl = "http://localhost:4003/api/users/vacations/";
    public vacationsAdminUrl = "http://localhost:4003/api/admin/vacations/";
    public vacationsImagesUsersUrl = "http://localhost:4003/api/users/vacations/images/";
    public followUrl = "http://localhost:4003/api/users/follow/";  
    public unfollowUrl = "http://localhost:4003/api/users/unFollow/";     
   
}

const appConfig = new AppConfig()

export default appConfig;