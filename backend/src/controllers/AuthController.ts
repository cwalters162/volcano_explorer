import User from "../models/User";
import {z} from "zod";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";

interface IAuthController {
    createUser(name: string, password: string): Error | User
    loginUser(name: string, password: string): Error | User
}

class AuthController implements IAuthController {
    userService: UserService
    authService: AuthService

    constructor(userService: UserService, authService: AuthService) {
        this.userService = userService
        this.authService = authService
    }
    createUser(name: string, password: string): Error | User {
        const user_exist = this.userService.getUserByName(name)
        if (user_exist) {
            return Error("User name already taken")
        } else {
            return this.userService.createUser(name, password)
        }
    }

    loginUser(name: string, password: string): Error | User {
        const user_exist = this.userService.getUserByName(name)
        if (user_exist) {
            return this.authService.loginUser(name, password)
        } else {
            return Error("User does not exist.")
        }
    }
}

export const ZAuthUserRequestSchema = z.object({
    name: z.string(),
    password: z.string(),
})

export default AuthController