import User from "../models/User";
import IDatabaseRepository from "../repositories/mockDBRepository"
import bcrypt from "bcrypt";
import {SALT_ROUNDS} from "../configs/appConfig";
interface IAuthService {
    createUser(name: string, password: string): Promise<Error | User>
    loginUser(name: string, password: string): Promise<Error | User>
}

class AuthService implements IAuthService {
    db: IDatabaseRepository
    constructor(db: IDatabaseRepository) {
        this.db = db
    }
    async createUser(name: string, password: string): Promise<Error | User > {
        return await bcrypt.hash(password, SALT_ROUNDS).then((hash): User => {
            return this.db.createUser(name, hash)
        }).catch((error) => error)
    }
    async loginUser(name: string, password: string): Promise<Error | User> {
        const hash = this.db.getUserPassword(name)
        if (typeof hash === typeof Error) {
            return hash as Error
        }
       const passwordMatch = await bcrypt.compare(password, hash as string)
        if (passwordMatch) {
            return this.db.getUserByName(name)
        } else {
            return Error("Incorrect Password.")
        }
    }
}

export default AuthService