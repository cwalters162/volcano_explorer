import app from "../app";
import {Request, Response} from "express";
import UserController, {ZCreateUserSchema} from "../controllers/UserController";
import User from "../models/User";

const express = require('express')
const UserRouter = express.Router()

UserRouter.post("/", async (req: Request, res: Response) => {
    const db = app.locals.db
    const userController = new UserController(db)
    try {
        const user: User = ZCreateUserSchema.parse(req.body) as User
        let success = userController.createUser(user)
        res.status(200).json(success)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

// UserRouter.post("/login", (req: Request, _res: Response) => {
//     const success = AuthController.loginUser(req.body)
// })

export default UserRouter