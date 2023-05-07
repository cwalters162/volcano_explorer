import {createTile, EndTile, StartTile, TTile} from "./Tile";
import {Player} from "../Player/Player";

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
            new_array[row].push(createTile())
        }
    }
    new_array[0][Math.floor(Math.random() * size)] = new StartTile()
    new_array[size - 1][Math.floor(Math.random() * size)] = new EndTile()
    return new_array
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