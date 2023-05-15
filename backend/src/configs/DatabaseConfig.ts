import User from "../models/User";
import GameState from "../models/GameState";
import {TTile} from "../models/Tile";
import {TPos} from "../services/GridMapService";

export interface IDatabaseRepository {
    getUsers(): User[]
    getUserByName(name: string): User
    getUserByID(id: number): User
    createUser(name: string, password: string): User
    getGameStateByUserID(playerId: number): GameState
    createGameState(health: number, moves: number, gridMap: TTile[][], player_id: number, start_location: TPos): GameState
}