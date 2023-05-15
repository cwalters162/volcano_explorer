import GameState from "../models/GameState";
import User from "../models/User";
import IDatabaseRepository from "../repositories/mockDBRepository"
import TileService from "./TileService";
import GridMapService from "./GridMapService";

interface IGameStateService {
    createGame(user: User): GameState
}

class GameStateService implements IGameStateService {
    gridMapService = new GridMapService(new TileService())
    db: IDatabaseRepository

    constructor(db: IDatabaseRepository) {
        this.db = db
    }

    createGame(user: User, health = 200, moves = 450, size = 50): GameState {
        const grid_map = this.gridMapService.generateGrid(size)
        const start_location = this.gridMapService.getStartLocation(grid_map)
        return this.db.createGameState(health, moves, grid_map, user.id, start_location)
    }
    getGameStateByPlayerID(player)
}