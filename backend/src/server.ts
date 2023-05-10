import {NextFunction, Request, Response} from 'express';
import * as path from "path";
import {generateGrid, renderWorld, replaceWorldPathWithPounds} from "./Map/Grid";
import {autoMovePlayer, createPlayer, getEndLocation, getStartLocation, Player} from "./Player/Player";
import app from "./app";
import PlayerRouter from "./Routes/PlayerRouter";
import MapRouter from "./Routes/MapRouter";
import {aStar} from "./PathFinding";
import {TTile} from "./Map/Tile";

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

app.get('/solve', (_req, res) => {
    const world = app.locals.world
    const player = app.locals.player
    const start_location = getStartLocation(world)
    const end_location = getEndLocation(world)
    const start_tile = world[start_location.x][start_location.y]
    const end_tile = world[end_location.x][end_location.y]

    const path = aStar(start_tile, end_tile, world)
    autoMovePlayer(player, path, world)
    replaceWorldPathWithPounds(world, path)
    res.send(renderWorld(player, world))
})

app.use(checkStatus)

app.use('/player', PlayerRouter)

app.use('/map', MapRouter)


app.get('/solve-until-win/:difficulty', (req, res) => {
    const difficulty= req.params.difficulty.toLowerCase()
    let isLoss = true
    let world: TTile[][]
    let player: Player
    try {
        if (difficulty == "easy" || difficulty == "medium" || difficulty == "hard") {
            while (isLoss) {
                world = app.locals.world = generateGrid(difficulty)
                player = app.locals.player = createPlayer(difficulty, world)

                const start_location = getStartLocation(world)
                const end_location = getEndLocation(world)
                const start_tile = world[start_location.x][start_location.y]
                const end_tile = world[end_location.x][end_location.y]

                const path = aStar(start_tile, end_tile, world)
                autoMovePlayer(player, path, world)
                if (player.health >= 1 || player.moves >= 1) {
                    isLoss = false
                    replaceWorldPathWithPounds(world, path)
                    res.send(renderWorld(player, world))
                    break
                }

            }
        }
        else {
            res.status(400).send("<h1>Please only use easy/medium/hard for the difficulty.</h1>")
        }
    } catch {
        res.status(500).send("<h1>Map failed to be created!</h1>" +
            "<h2>Please contact the server administrator</h2>")
    }
})

app.get('/api/world', (_req, res) => {
    const world = app.locals.world
    const player = app.locals.player
    const game_state = { world: world, player: player}
    res.json(game_state)
})

app.listen(3000, () => {
    const world = app.locals.world = generateGrid("medium")
    app.locals.player = createPlayer("medium", world)
    console.log('Server listening on port 3000');
});