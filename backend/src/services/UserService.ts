import User from "../models/User";
import IDatabaseRepository from "../repositories/mockDBRepository"
interface IUserService {
    getUserByName(name: string): User
    // getUserByID(id: number): User
    createUser(name: string, password: string): User
    // deleteUser(): User
    // update(): User
}

class UserService implements IUserService {
    db: IDatabaseRepository
    constructor(db: IDatabaseRepository) {
        this.db = db
    }
    getUserByName(name: string): User {
        return this.db.getUserByName(name)
    }

    createUser(name: string, password: string): User {
        return this.db.createUser(name, password)
    }
}

export default UserService