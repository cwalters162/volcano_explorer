import express from 'express';
import * as path from "path";

const app = express();

// WORLD GENERATION SECTION

enum TileType {
    Blank,
    Speeder,
    Lava,
    Mud,
    Start,
    End
}

type TTile = {
    type: TileType
    health_cost: number
    move_cost: number
    symbol: string
}

function createTile(): TTile {
    const number_of_tile_types = Object.keys(TileType).length / 2;
    const tile_selector = Math.floor(Math.random() * number_of_tile_types - 2)
    switch (tile_selector) {
        case 0:
            return new BlankTile()
        case 1:
            return new SpeederTile()
        case 2:
            return new LavaTile()
        case 3:
            return new MudTile()
        default:
            return new BlankTile()
    }
}

class BlankTile implements TTile {
    type = TileType.Blank
    health_cost = 0
    move_cost = -1
    symbol = '.'
}

class SpeederTile implements TTile {
    type = TileType.Blank
    health_cost = -5
    move_cost = 0
    symbol = 'S'
}

class LavaTile implements TTile {
    type = TileType.Lava
    health_cost = -50
    move_cost = -10
    symbol = 'L'
}

class MudTile implements TTile {
    type = TileType.Mud
    health_cost = -10
    move_cost = -5
    symbol = 'M'
}

class StartTile implements TTile {
    type = TileType.Start
    health_cost = 0
    move_cost = -1
    symbol = 'H'
}

class EndTile implements TTile {
    type = TileType.End
    health_cost = 0
    move_cost = -1
    symbol = 'Z'
}

function generateMap(difficulty: string): TTile[][] {
    let size = 50
    switch (difficulty) {
        case "easy": size = 30; break
        case "medium": size = 40; break
        case "hard": size = 50; break
        default: size = 50
    }

    let new_array: TTile[][] = []
    for (let row = 0; row < size; row++){
        new_array.push([])
        for (let col = 0; col < size; col++) {
            new_array[row].push(createTile())
        }
    }
    new_array[0][Math.floor(Math.random() * size)] = new StartTile()
    new_array[size - 1][Math.floor(Math.random() * size)] = new EndTile()
    return new_array
}

// PLAYER SECTION

type TPos = {
    x: number
    y: number
}

type TPlayer = {
    health: number
    moves: number
    location: TPos
}

class Player implements TPlayer {
    health: number
    moves: number
    location: TPos
    constructor(health: number, moves: number, location: TPos) {
        this.health = health
        this.moves = moves
        this.location = location
    }
}

function getStartLocation(): TPos {
    const y: number = app.locals.world[0].indexOf((tile: TTile) => tile.type == TileType.Start)

    return {x: 0, y: y}
}

function createPlayer(difficulty: string): Player {

    return new Player(health, moves, location)
}
// ROUTE SECTION

app.get('/', async (_req, res) => {
    res.sendFile("./index.html", {root: path.join(__dirname, '.')})
});

app.get('/new-game/:difficulty', (req, res) => {
    let difficulty= req.params.difficulty.toLowerCase()

    try {

        if (difficulty == "easy" || difficulty == "medium" || difficulty == "hard") {
            app.locals.world = generateMap(difficulty)
            // app.locals.player = createPlayer()
            res.status(200).send("<h1>Game created successfully!</h1>" +
                "<h2>Please check /help for assistance on how to play!</h2>")
        }
        else {
            res.status(400).send("<h1>Please only use easy/medium/hard for the difficulty.</h1>")
        }
    } catch {
        res.status(500).send("<h1>Game failed to be created!</h1>" +
        "<h2>Please contact the server administrator</h2>")
    }
});

app.get('/move/:direction', (_req, _res) => {

});

app.get('/player', (_req, _res) => {

});

app.get('/map', (_req, _res) => {

});

app.get('/help', (_req, _res) => {

})

app.get('/world-status', (_req, _res) => {

});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});