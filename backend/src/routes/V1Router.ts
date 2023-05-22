import app from "../app"
import express from "express";
const V1Router = express.Router()
import {Request, Response} from "express"
import GameController, {CreateGameRequest, ZCreateGameRequestSchema, ZEnumDirectionSchema} from "../controllers/GameController";
import GameState from "../models/GameState";

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

//Responds with an array of game ids for that player
V1Router.get("/games", async (req, res) => {
    const gameController = app.locals.gameController
    const userId = req.session.user?.id
    try {
        const result =  await gameController.getAllGamesByUserId(userId)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

V1Router.get("/game/:gameId", async (req, res) => {
    const gameController = app.locals.gameController
    const userId = req.session.user?.id
    const gameIdString = req.params.gameId
    try {
        const gameId = parseInt(gameIdString)

        if (typeof userId === "number") {
            const result = await gameController.getGameStateByID(userId, gameId)
            res.status(200).json(result)
        } else {
            res.status(400).json({error: "Please login."})
        }

    } catch {
        res.status(500).json({error: `Unable to get the game`})
    }
})


// TODO: Make sure this only works on games that are in "PLAYING" status.
V1Router.post("/game/:gameId/move/:direction", async (req, res) => {
    const gameController: GameController = app.locals.gameController
    const userId = req.session.user?.id
    const gameIdString = req.params.gameId
    try {
        if (typeof userId == typeof undefined) {
            res.status(400).json({error: "Please login again your session has been corrupted"})
        }
        const gameId = parseInt(gameIdString)

        const direction = ZEnumDirectionSchema.parse(req.params.direction)
        const result = await gameController.movePlayerInGameById(userId!, gameId, direction)
        if (result instanceof GameState) {
            res.status(200).json({result})
        } else {
            res.status(500).json({error: result.message})
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
})

export default V1Router