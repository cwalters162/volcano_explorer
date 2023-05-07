export enum TileType {
    Blank,
    Speeder,
    Lava,
    Mud,
    Start,
    End
}

export type TTile = {
    type: TileType
    health_cost: number
    move_cost: number
    symbol: string
}

export function createTile(): TTile {
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

export class BlankTile implements TTile {
    type = TileType.Blank
    health_cost = 0
    move_cost = -1
    symbol = '.'
}

export class SpeederTile implements TTile {
    type = TileType.Speeder
    health_cost = -5
    move_cost = 0
    symbol = 'S'
}

export class LavaTile implements TTile {
    type = TileType.Lava
    health_cost = -50
    move_cost = -10
    symbol = 'L'
}

export class MudTile implements TTile {
    type = TileType.Mud
    health_cost = -10
    move_cost = -5
    symbol = 'M'
}

export class StartTile implements TTile {
    type = TileType.Start
    health_cost = 0
    move_cost = -1
    symbol = 'H'
}

export class EndTile implements TTile {
    type = TileType.End
    health_cost = 0
    move_cost = -1
    symbol = 'Z'
}