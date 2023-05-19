import GameState from "../models/GameState";
import IDatabaseRepository from "../repositories/mockDBRepository"
import TileService from "./TileService";
import GridMapService from "./GridMapService";
import {z} from "zod";

interface IGameService {
    createGame(userId: number, size: number, health: number, moves: number): GameState
    getAllGamesByUserId(userId: number): Error | number[]
    getGameStateById(userId: number, gameId: number): Error | GameState
}

export const ZEnumDifficultySchema = z.enum(["custom", "easy", "medium", "hard"])

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
    getAllGamesByUserId(userId: number): Error | number[] {
        const userExists = this.db.getUserByID(userId)
        if (userExists) {
            return this.db.getAllGameIdsByUserId(userId)
        } else {
            return Error("User ID not found.")
        }
    }
    // TODO: FIX THIS FUNCTION WAS WORKING HERE
    getGameStateById(playerId: number, gameId: number): Error | GameState {
        try {
            const game = this.db.getGameStateById(gameId)
        } catch (e) {
            return
        }
        if (game.player_id != playerId) {
            return Error(`User ID: ${playerId} does not have access to this game`)
        } else {
            return game
        }
    }
}

export default GameService