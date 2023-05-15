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
}
export class BlankTile implements TTile {
    x: number
    y: number
    type = TileType.Blank
    health_cost = 0
    move_cost = -1
    symbol = '.'
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
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}