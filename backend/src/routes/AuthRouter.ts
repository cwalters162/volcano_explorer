import app from "../app";
import {Request, Response} from "express";
import {ZAuthUserRequestSchema} from "../controllers/AuthController"
import User from "../models/User";
import express from "express";
const AuthRouter = express.Router()

AuthRouter.post("/user", async (req: Request, res: Response) => {
    const authController = app.locals.authController

    try {
        const user = ZAuthUserRequestSchema.parse(req.body)
        let result = await authController.createUser(user.name, user.password)
        if (result instanceof User) {
            res.status(200).json(result)
        } else {
            res.status(500).json({error: `${result}`})
        }
    } catch (error) {
        res.status(400).json({error: error})
    }
})

AuthRouter.post("/login", async (req: Request, res: Response) => {
    const authController = app.locals.authController

    try {
        const user = ZAuthUserRequestSchema.parse(req.body)
        let result = await authController.loginUser(user.name, user.password)
        if (result instanceof User) {
            res.status(200).json(result)
        } else {
            res.status(500).json({error: `${result}`})
        }
    } catch (error) {
        res.status(400).json({error: error})
    }
})

export default AuthRouter