import user from "../models/User";
import {IDatabaseRepository} from "../configs/DatabaseConfig";
import User from "../models/User";
import bcrypt from 'bcrypt';

interface IAuthController {
    loginUser(): user
}

class AuthController implements IAuthController {
    db: IDatabaseRepository

    constructor(db: IDatabaseRepository) {
        this.db = db
    }
    loginUser(name: string, password: string): User {
        const user = this.db.getUserByName(name)
        if (user) {
            if (user.password === bcrypt.compare(password, user.password)) {
                return
            }
        }

    }
}