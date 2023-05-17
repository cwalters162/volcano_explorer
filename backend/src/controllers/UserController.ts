import UserService from "../services/UserService";
import {IDatabaseRepository} from "../configs/DatabaseConfig";
import User from "../models/User";
import MockDBRepository from "../repositories/mockDBRepository";
import {z} from "zod";

interface IUserController {
    createUser(body: User): User
}

class UserController implements IUserController {
    db: IDatabaseRepository
    userService: UserService

    constructor(db: IDatabaseRepository) {
        this.db = db
        this.userService = new UserService(db as MockDBRepository)
    }


    createUser(user: User): User {
        return this.userService.createUser(user.name, user.password)
    }
}
export const ZCreateUserSchema = z.object({

    name: z.string(),
    password: z.string(),

})
export default UserController