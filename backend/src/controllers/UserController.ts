import UserService from "../services/UserService";
import {IDatabaseRepository} from "../configs/DatabaseConfig";
import User from "../models/User";
import MockDBRepository from "../repositories/mockDBRepository";

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


    createUser(body: User): User {
        return this.userService.createUser(body.name, body.password)
    }
}

export default UserController