import RoleModel from "./Role-Model";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role?: RoleModel;
}
export default UserModel