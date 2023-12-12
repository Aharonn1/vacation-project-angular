import Joi from "joi";
import { ValidationError } from "./client-errors";
import RoleModel from "./role-model";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role?: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    private static validationSchema = Joi.object({
        userId : Joi.number().optional().integer().positive(),
        firstName : Joi.string().required().max(30),
        lastName : Joi.string().required().max(30),
        email : Joi.string().required().max(50),
        password : Joi.string().required().max(256),
        role : Joi.string().optional()
    })

    public validate():void{
        const result = UserModel.validationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message)
    }

    // TODO: Validation

}

export default UserModel;