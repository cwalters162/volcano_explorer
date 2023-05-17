import User from "../models/User";
import IDatabaseRepository from "../repositories/mockDBRepository"
interface IAuthService {
    loginUser(name: string, password: string): Error | User
}

class AuthService implements IAuthService {
    db: IDatabaseRepository
    constructor(db: IDatabaseRepository) {
        this.db = db
    }
    loginUser(name: string, password: string): Error | User {
        const result = this.db.getUserByName(name)
        if (password === result.password) {
            return result
        } else {
            return Error("Incorrect Password.")
        }
    }
}

export default AuthService