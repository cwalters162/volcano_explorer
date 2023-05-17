import UserService from "../services/UserService";
import {IDatabaseRepository} from "../configs/DatabaseConfig";
import MockDBRepository from "../repositories/mockDBRepository";

interface IUserController {
}

class UserController implements IUserController {
    db: IDatabaseRepository
    userService: UserService

    constructor(db: IDatabaseRepository) {
        this.db = db
        this.userService = new UserService(db as MockDBRepository)
    }
}

export default UserController