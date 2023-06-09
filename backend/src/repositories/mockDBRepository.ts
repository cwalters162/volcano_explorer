import User from "../models/User";
import GameState from "../models/GameState";
import {TTile} from "../models/Tile";
import {TPos} from "../services/GridMapService";
import {IDatabaseRepository} from "../configs/DatabaseConfig";
class mockDBRepository implements IDatabaseRepository{
    users: User[]
    passwords: Map<string, string>
    nextUserId: number
    gameState: GameState[]
    nextGameStateId: number


    constructor() {
        this.users = []
        this.passwords = new Map<string, string>()
        this.gameState = []
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
    checkUserPassword(name: string, password: string): Boolean {
        const user_found = this.passwords.get(name)
        return !!(user_found && user_found === password);
    }
    getUserPassword(name: string): Error | string {
        const hashFound = this.passwords.get(name)
        if (hashFound) {
            return hashFound
        } else {
            return Error("User does not exist.")
        }
    }
    createUser(name: string, hash: string) {
        this.passwords.set(name, hash)
        const newUser = new User(this.nextUserId, name)
        this.users.push(newUser)
        this.nextUserId += 1
        return newUser
    }
    getGameStateById(gameId: number): Error | GameState {
        const game = this.gameState.find(gs => gs.id === gameId)
        if (game) {
            return game
        } else {
            return Error(`Could not find game: ${gameId}`)
        }
    }
    getAllGameIdsByUserId(userId: number): number[] {
        const playerGames = this.gameState.filter(gs => gs.player_id === userId)
        return playerGames.map(gs => gs.id)
    }

    createGameState(health: number, moves: number, player_id: number, start_location: TPos, gridMap: TTile[][]): GameState {
        const newGameState = new GameState(this.nextGameStateId, health, moves, player_id, start_location, gridMap)
        this.gameState.push(newGameState)
        this.nextGameStateId += 1
        return newGameState
    }

    updateGameStateById(updatedGameState: GameState): Number {
        const index = this.gameState.findIndex(gs => gs.id === updatedGameState.id)
        this.gameState[index] = updatedGameState
        return 1
    }

}

export default mockDBRepository