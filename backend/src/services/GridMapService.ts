import {EndTile, StartTile, TileType, TTile} from "../models/Tile";
import TileService from "./TileService";

export type TPos = {
    x: number
    y: number
}

class GridMapService {
    tileService: TileService

    constructor(tileService: TileService) {
        this.tileService = tileService
    }
    generateGrid(size: number): TTile[][] {
        let new_array: TTile[][] = []
        for (let row = 0; row < size; row++){
            new_array.push([])
            for (let col = 0; col < size; col++) {
                new_array[row].push(this.tileService.createTile(row, col))
            }
        }
        const start_y = Math.floor(Math.random() * size)
        new_array[0][start_y] = new StartTile(0, start_y)
        const end_y = Math.floor(Math.random() * size)
        new_array[size - 1][end_y] = new EndTile(size - 1, end_y)
        return new_array
    }

    getStartLocation(grid_map: TTile[][]): TPos {
        const y: number = grid_map[0].findIndex((tile) => tile.type == TileType.Start)
        return {x: 0, y: y}
    }

    getEndLocation(grid_map: TTile[][]): TPos {
        const end_row = grid_map.length - 1
        const y: number = grid_map[end_row].findIndex((tile) => tile.type == TileType.End)
        return {x: end_row, y: y}
    }
}

export default GridMapService