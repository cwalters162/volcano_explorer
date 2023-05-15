import User from "../models/User";
import GameState from "../models/GameState";
import {TTile} from "../models/Tile";
import {TPos} from "../services/GridMapService";
import {IDatabaseRepository} from "../configs/DatabaseConfig";
class mockDBRepository implements IDatabaseRepository{
    users: User[]
    nextUserId: number
    gameState: GameState[]
    nextGameStateId: number


    constructor() {
        this.users = []
        this.gameState =[]
        this.nextUserId = 1
        this.nextGameStateId = 1
    }

    getUsers(): User[] {
        return this.users
    }
    getUserByName(name: string): User {
        const userIndex = this.users.findIndex(user => user.name === name)
        return this.users[userIndex]
    }

    getUserByID(id: number): User {
        const userIndex = this.users.findIndex(user => user.id === id);

        return this.users[userIndex]
    }
    createUser(name: string, password: string) {
        const newUser = new User(this.nextUserId, name, password)
        this.users.push(newUser)
        this.nextUserId += 1
        return newUser
    }
    createGameState(health: number, moves: number, gridMap: TTile[][], player_id: number, start_location: TPos): GameState {
        const newGameState = new GameState(this.nextGameStateId, health, moves, gridMap, player_id, start_location)
        this.gameState.push(newGameState)
        this.nextGameStateId += 1
        return newGameState
    }
    getGameStateByUserID(playerId: number): GameState {
        const gameStateIndex = this.gameState.findIndex(gameState => gameState.player_id = playerId)
        return this.gameState[gameStateIndex]
    }
}

export default mockDBRepository