import express from 'express';

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
}

class SpeederTile implements TTile {
    type = TileType.Blank
    health_cost = -5
    move_cost = 0
}

class LavaTile implements TTile {
    type = TileType.Lava
    health_cost = -50
    move_cost = -10
}

class MudTile implements TTile {
    type = TileType.Mud
    health_cost = -10
    move_cost = -5
}

class StartTile implements TTile {
    type = TileType.Start
    health_cost = 0
    move_cost = -1
}

class EndTile implements TTile {
    type = TileType.End
    health_cost = 0
    move_cost = -1
}

function generateMap(size: number): TTile[][] {
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

app.get('/', async (_req, res) => {
    res.send("<h1>I'm alive!</h1>")
});

app.get('/generate-map/:size', (req, res) => {
    try {
        const size: number = Number.parseInt(req.params.size)
        if (size < 5) {
            res.status(401).json({ error: "not a number 5 or greater."})
        }
        const world = generateMap(size)
        app.locals.world = world
        res.json({map: app.locals.world, error: ''});
    } catch {
        res.status(401).json({ error: "not a number 5 or greater."})
    }
})

app.get('/create-player/:health/:moves/', (req, res) => {
    let health: number = 200
    let moves: number = 450
    try {
        health = Number.parseInt(req.params.health)
        if (health < 50 ) {
            res.status(401).json({ error: "Not a number 50 or greater"})
        }
    } catch {
        res.status(401).json({ error: "not a number 50 or greater."})
    }

    try {
        moves = Number.parseInt(req.params.moves)
        if (moves < 100 ) {
            res.status(401).json({ error: "Not a number 100 or greater"})
        }
    } catch {
        res.status(401).json({ error: "not a number 100 or greater."})
    }
    const start_location = getStartLocation();
    app.locals.player = new Player(health, moves, start_location);
    res.status(200).json({player: app.locals.player, error: ''})
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});