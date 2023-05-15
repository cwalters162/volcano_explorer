import app from "../app";
import {Request, Response} from "express";
import UserController from "../controllers/UserController";

const express = require('express')
const UserRouter = express.Router()

UserRouter.post("/", (req: Request, res: Response) => {
    const db = app.locals.db
    const userController = new UserController(db)
    try {
        let success = userController.createUser(req.body)
        res.status(200).json(success)
    } catch {
        res.status(500).json({error: "broken"})
    }
})

// UserRouter.post("/login", (_req: Request, _res: Response) => {
//     respons
// })

UserRouter.get

export default UserRouter