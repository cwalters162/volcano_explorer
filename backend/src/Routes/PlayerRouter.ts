import app from "../app";
import {Request, Response} from "express";
import {TTile} from "../Map/Tile";

const express = require('express')
const router = express.Router()

router.get('/', (_req: Request, res: Response) => {
    const player_health = app.locals.player.health
    const player_moves = app.locals.player.moves
    const player_x = app.locals.player.location.x
    const player_y = app.locals.player.location.y

    res.status(200).send(
        "<h1>Player Information<h1>" +
        `<p>Health: ${player_health}</p>` +
        `<p>Moves: ${player_moves}</p>` +
        `<p>Location: X: ${player_x}. Y: ${player_y}</p>`
    )
});

router.get('/move/:direction', (req: Request, res: Response) => {
    let direction = req.params.direction.toLowerCase()
    let result: string = ''
    const world: TTile[][] = app.locals.world
    switch (direction) {
        case "up":  { result = app.locals.player.moveUp(world)} break
        case "down":  { result = app.locals.player.moveDown(world)} break
        case "left":  { result = app.locals.player.moveLeft(world)} break
        case "right":  { result = app.locals.player.moveRight(world)} break
        default: res.status(400).send("<h1>Invalid direction</h1>" + "<h2>Please only use up, down, left, right</h2>")
    }
    if (result == "failure") {
        res.status(400).send("<h1>Unable to move that direction</h1>" + "<h2>Please ensure to not move out of bounds</h2>")
    } else if (result == "success") {
        res.status(200).send("<h1>Successfully moved!</h1>" + `<h2>New location is X: ${app.locals.player.location.x}. Y: ${app.locals.player.location.y}</h2>`)
    }
});

export default router