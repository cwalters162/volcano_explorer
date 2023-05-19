import app from "../app"
import express from "express";
const V1Router = express.Router()
import {Request, Response} from "express"
import {CreateGameRequest, ZCreateGameRequestSchema} from "../controllers/GameController";

V1Router.post("/creategame", async (req: Request, res: Response) => {
    const gameController = app.locals.gameController
    const userId = req.session.user!.id
    if (!userId) {
        res.status(400).json({error: "Please login"})
    }

    try {
        const createGameRequest: CreateGameRequest = ZCreateGameRequestSchema.parse(req.body)
        const result = await gameController.createGame(userId, createGameRequest)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({error: err})
    }

})

export default V1Router