import express, {NextFunction, Request, Response} from 'express';
import * as path from "path";
import {generateGrid, renderWorld} from "./Map/Grid";
import {TTile} from "./Map/Tile";
import {createPlayer, getEndLocation} from "./Player/Player";

const app = express();

// MIDDLEWARE SECTION

function checkStatus (_req: Request, res: Response, next: NextFunction): void {
    const player = app.locals.player
    const player_health = app.locals.player.health
    const player_moves = app.locals.player.moves
    const world = app.locals.world
    const end_location = getEndLocation(world)
    if (player.location == end_location) {
        res.send("<h1>Congratulations! You win!</h1>" +
            "<h2>Play again with /new-game/:difficulty!</h2>")
    } else if (player_health <= 0) {
        res.send("<h1>Player has died!</h1>" +
            "<h2>Try again with /new-game/:difficulty!</h2>")
    } else if (player_moves <= 0) {
        res.send("<h1>Player has no more moves!</h1>" +
            "<h2>Try again with /new-game/:difficulty!</h2>")
    }
    next()
}

// ROUTE SECTION

app.get('/', (_req, res) => {
    res.sendFile("./index.html", {root: path.join(__dirname, '.')})
});

app.get('/new-game/:difficulty', (req, res) => {
    let difficulty= req.params.difficulty.toLowerCase()

    try {
        if (difficulty == "easy" || difficulty == "medium" || difficulty == "hard") {
            const world = app.locals.world = generateGrid(difficulty)
            app.locals.player = createPlayer(difficulty, world)
            res.status(200).send("<h1>Game created successfully!</h1>" +
                "<h2>Please check /help for assistance on how to play!</h2>")
        }
        else {
            res.status(400).send("<h1>Please only use easy/medium/hard for the difficulty.</h1>")
        }
    } catch {
        res.status(500).send("<h1>Map failed to be created!</h1>" +
        "<h2>Please contact the server administrator</h2>")
    }
});

app.use(checkStatus)

app.get('/move/:direction', (req, res) => {
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

app.get('/player', (_req, res) => {
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

app.get('/map', (_req, res) => {

    try {
        const player = app.locals.player
        const world = app.locals.world
        res.status(200).send(renderWorld(player, world))
    } catch (error) {
        res.status(500).send("<h1>Map failed to be created!</h1>" +
            "<h2>Please contact the server administrator</h2>" +
            `Error: ${error}`)
    }
});

// app.get('/help', (_req, _res) => {
//
// })

// app.get('/world-status', (_req, _res) => {
//
// });

app.listen(3000, () => {
    const world = app.locals.world = generateGrid("medium")
    app.locals.player = createPlayer("medium", world)
    console.log('Server listening on port 3000');
});