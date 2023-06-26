import User from "../models/User";
import GameState, {IGameDescription} from "../models/GameState";
import {TTile} from "../models/Tile";
import {TPos} from "../services/GridMapService";

export interface IDatabaseRepository {
    getUsers(): User[]
    getUserByName(name: string): User
    getUserByID(id: number): User
    checkUserPassword(name: string, password: string): Boolean
    getUserPassword(name: string): Error | string
    createUser(name: string, password: string): User
    getGameStateById(gameId: number): Error | GameState
    getAllGameIdsByUserId(userId: number): IGameDescription[]
    createGameState(health: number, moves: number, player_id: number, start_location: TPos, gridMap: TTile[][]): GameState
}