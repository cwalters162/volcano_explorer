// PLAYER SECTION

import {TileType, TTile} from "../Map/Tile";

export type TPos = {
    x: number
    y: number
}

type TPlayer = {
    health: number
    moves: number
    location: TPos
    symbol: string
}

export class Player implements TPlayer {
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

export function getStartLocation(world: TTile[][]): TPos {
    const y: number = world[0].findIndex((tile) => tile.type == TileType.Start)
    return {x: 0, y: y}
}

export function getEndLocation(world: TTile[][]): TPos {
    const end_row = world.length - 1
    const y: number = world[end_row].findIndex((tile) => tile.type == TileType.End)
    return {x: end_row, y: y}
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