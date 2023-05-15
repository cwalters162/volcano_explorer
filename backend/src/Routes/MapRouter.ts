import app from "../app";
import {renderWorld} from "../model/Grid";
import {Request, Response} from "express";

const express = require('express')
const router = express.Router()

router.get('/', (_req: Request, res: Response) => {

    try {
        const player = app.locals.player
        const world = app.locals.world
        res.status(200).send(renderWorld(player, world))
    } catch (error) {
        res.status(500).send("<h1>Map failed to be created!</h1>" +
            "<h2>Please contact the server administrator</h2>" +
            `Error: ${error}`)
    }
})

export default router