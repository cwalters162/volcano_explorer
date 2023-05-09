import {NextFunction, Request, Response} from 'express';
import * as path from "path";
import { generateGrid } from "./Map/Grid";
import {createPlayer, getEndLocation} from "./Player/Player";
import app from "./app";
import PlayerRouter from "./Routes/PlayerRouter";
import MapRouter from "./Routes/MapRouter";

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

app.all('/', (_req, res) => {
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

app.use('/player', PlayerRouter)

app.use('/map', MapRouter)

app.listen(3000, () => {
    const world = app.locals.world = generateGrid("medium")
    app.locals.player = createPlayer("medium", world)
    console.log('Server listening on port 3000');
});