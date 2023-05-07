import express, {NextFunction, Request, Response} from 'express';
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
    type = TileType.Speeder
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
        case "medium": size = 50; break
        case "hard": size = 70; break
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
    symbol: string
}

class Player implements TPlayer {
    health: number
    moves: number
    location: TPos
    symbol = '@'

    constructor(health: number, moves: number, location: TPos) {
        this.health = health
        this.moves = moves
        this.location = location
    }
    moveUp(world: TTile[][]): string {
        if (this.location.x == 0) {
            return "failure"
        } else {
            this.location.x -= 1
            this.health += world[this.location.x][this.location.y].health_cost
            this.moves += world[this.location.x][this.location.y].move_cost
            return "success"
        }
    }
    moveDown(world: TTile[][]): string {
        if (this.location.x == world.length - 1) {
            return "failure"
        } else {
            this.location.x += 1
            this.health += world[this.location.x][this.location.y].health_cost
            this.moves += world[this.location.x][this.location.y].move_cost
            return "success"
        }
    }
    moveLeft(world: TTile[][]): string {
        if (this.location.y == 0) {
            return "failure"
        } else {
            this.location.y -= 1
            this.health += world[this.location.x][this.location.y].health_cost
            this.moves += world[this.location.x][this.location.y].move_cost
            return "success"
        }
    }
    moveRight(world: TTile[][]): string {
        if (this.location.y == world[0].length - 1) {
            return "failure"
        } else {
            this.location.y += 1
            this.health += world[this.location.x][this.location.y].health_cost
            this.moves += world[this.location.x][this.location.y].move_cost
            return "success"
        }
    }
}

function getStartLocation(world: TTile[][]): TPos {
    const y: number = world[0].findIndex((tile) => tile.type == TileType.Start)
    return {x: 0, y: y}
}

function getEndLocation(world: TTile[][]): TPos {
    const end_row = world.length - 1
    const y: number = world[end_row].findIndex((tile) => tile.type == TileType.End)
    return {x: end_row, y: y}
}

function createPlayer(difficulty: string, world: TTile[][]): Player {
    let health = 250
    let moves = 450
    const location = getStartLocation(world)

    switch (difficulty) {
        case "easy": { health = 300; moves = 500; break }
        case "medium": { health = 250; moves = 450; break}
        case "hard": { health = 200; moves = 400; break }
        default: break
    }

    return new Player(health, moves, location)
}

function renderWorld(player: Player, world: TTile[][]): string[] {

    return world.flatMap((col, x) => {
        return col.flatMap((tile, y) => {
            if (x == player.location.x && y == player.location.y) {
                return player.symbol
            } else { 
                return tile.symbol
            } 
        }).join('')
    })
}

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
            const world = app.locals.world = generateMap(difficulty)
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
    const world = app.locals.world = generateMap("medium")
    app.locals.player = createPlayer("medium", world)
    console.log('Server listening on port 3000');
});