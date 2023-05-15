import {createTile, EndTile, StartTile, TileType, TTile} from "./Tile";
import {Player} from "./Player";

export type TPos = {
    x: number
    y: number
}

export function generateGrid(difficulty: string): TTile[][] {
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
            new_array[row].push(createTile(row, col))
        }
    }
    const start_y = Math.floor(Math.random() * size)
    new_array[0][start_y] = new StartTile(0, start_y)
    const end_y = Math.floor(Math.random() * size)
    new_array[size - 1][end_y] = new EndTile(size - 1, end_y)
    addNeighbors(new_array)
    return new_array
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

function addNeighbors(grid: TTile[][]) {
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            const tile = grid[x][y];
            const neighbors: TPos[] = [];

            if (x > 0) {
                neighbors.push({x: x - 1, y: y});
            }
            if (x < grid.length - 1) {
                neighbors.push({x: x + 1, y: y});
            }
            if (y > 0) {
                neighbors.push({x: x, y: y - 1});
            }
            if (y < grid[x].length - 1) {
                neighbors.push({x: x, y: y + 1});
            }

            tile.neighbors = neighbors;
        }
    }
}

export function renderWorld(player: Player, world: TTile[][]): string[] {

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

export function replaceWorldPathWithPounds(world: TTile[][], path: TTile[]) {
    let modified_world = world;
    path.map( path_tile=> {
        modified_world.map((row: TTile[]) => row.map( (tile: TTile) => {
            if (path_tile === tile) {
                tile.symbol = '#'
                return
            }
        }))
    })
    return modified_world
}