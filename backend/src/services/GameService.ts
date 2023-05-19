import GameState from "../models/GameState";
import IDatabaseRepository from "../repositories/mockDBRepository"
import TileService from "./TileService";
import GridMapService from "./GridMapService";
import {z} from "zod";

interface IGameService {
    createGame(userId: number, size: number, health: number, moves: number): GameState
}

export const ZEnumDifficultySchema = z.enum(["custom", "easy", "medium", "hard"])

export type EDIFFICULTY = z.infer<typeof ZEnumDifficultySchema>

class GameService implements IGameService {
    gridMapService = new GridMapService(new TileService())
    db: IDatabaseRepository

    constructor(db: IDatabaseRepository) {
        this.db = db
    }

    createGame(userId: number, size = 50, health = 200, moves = 450, ): GameState {
        const grid_map = this.gridMapService.generateGrid(size)
        const start_location = this.gridMapService.getStartLocation(grid_map)
        return this.db.createGameState(health, moves, userId, start_location, grid_map)
    }
}

export default GameService