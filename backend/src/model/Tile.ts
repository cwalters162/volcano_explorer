import {TPos, TTile} from "./types";

export enum TileType {
    Blank,
    Speeder,
    Lava,
    Mud,
    Start,
    End
}

export type TTile = {
    x: number
    y: number
    type: TileType
    health_cost: number
    move_cost: number
    symbol: string
    neighbors: TPos[]
}

export function createTile(x: number, y: number): TTile {
    const number_of_tile_types = Object.keys(TileType).length / 2;
    const tile_selector = Math.floor(Math.random() * number_of_tile_types - 2)
    switch (tile_selector) {
        case 0:
            return new BlankTile(x, y)
        case 1:
            return new SpeederTile(x, y)
        case 2:
            return new LavaTile(x, y)
        case 3:
            return new MudTile(x, y)
        default:
            return new BlankTile(x, y)
    }
}

export class BlankTile implements TTile {
    x: number
    y: number
    type = TileType.Blank
    health_cost = 0
    move_cost = -1
    symbol = '.'
    neighbors = []

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }


}

export class SpeederTile implements TTile {
    x: number
    y: number
    type = TileType.Speeder
    health_cost = -5
    move_cost = 0
    symbol = 'S'
    neighbors = []
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

export class LavaTile implements TTile {
    x: number
    y: number
    type = TileType.Lava
    health_cost = -50
    move_cost = -10
    symbol = 'L'
    neighbors = []
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

export class MudTile implements TTile {
    x: number
    y: number
    type = TileType.Mud
    health_cost = -10
    move_cost = -5
    symbol = 'M'
    neighbors = []
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

export class StartTile implements TTile {
    x: number
    y: number
    type = TileType.Start
    health_cost = 0
    move_cost = -1
    symbol = 'H'
    neighbors = []
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

export class EndTile implements TTile {
    x: number
    y: number
    type = TileType.End
    health_cost = 0
    move_cost = -1
    symbol = 'Z'
    neighbors = []
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}