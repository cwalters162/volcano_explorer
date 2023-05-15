import {getStartLocation, TPos} from "./Grid";
import {TTile} from "./Tile";

export class Player {
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



export function createPlayer(difficulty: string, world: TTile[][]): Player {
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

