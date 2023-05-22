import GameState, {EGameStatus} from "../models/GameState";
import IDatabaseRepository from "../repositories/mockDBRepository"
import TileService from "./TileService";
import GridMapService from "./GridMapService";
import {z} from "zod";
import {TTile} from "../models/Tile";
import {aStar} from "../Utilites/PathFindingUtilites";

interface IGameService {
    createGame(userId: number, size: number, health: number, moves: number): GameState
    getAllGamesByUserId(userId: number): Error | number[]
    getGameStateById(userId: number, gameId: number): Error | GameState
    movePlayerInGameByID(playerId: number, gameId: number, direction: string): Error | GameState
    getGameSolutionById(gameId: number): Promise<Error | TTile[]>
}

export const ZEnumDifficultySchema = z.enum(["custom", "easy", "medium", "hard"])

class GameService implements IGameService {
    gridMapService = new GridMapService(new TileService())
    db: IDatabaseRepository

    constructor(db: IDatabaseRepository) {
        this.db = db
    }

    createGame(userId: number, size = 50, health = 200, moves = 450,): GameState {
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

    getGameStateById(playerId: number, gameId: number): Error | GameState {
        const game = this.db.getGameStateById(gameId)
        if (game instanceof GameState && game.player_id == playerId) {
            return game
        } else {
            return Error(`User ID: ${playerId} does not have access to this game`)
        }
    }

    movePlayerInGameByID(playerId: number, gameId: number, direction: string): Error | GameState {
        const game = this.db.getGameStateById(gameId)
        if (game instanceof GameState && game.player_id == playerId) {
            const endLocation = this.gridMapService.getEndLocation(game.map)
            const current_pos = game.player_location
            switch (direction) {
                case "up": {
                    if (current_pos.x == 0) {
                        return Error("Unable to move up. Already at the top.")
                    } else {
                        game.moves += game.map[current_pos.x - 1][current_pos.y].move_cost
                        game.health += game.map[current_pos.x - 1][current_pos.y].health_cost
                        game.player_location.x -= 1

                        if (game.moves <= 0 || game.health <= 0) {
                            game.game_status = EGameStatus.LOSS
                        } else if (game.player_location.x == endLocation.x && game.player_location.y == endLocation.y) {
                            game.game_status = EGameStatus.WIN
                        }

                        const result = this.db.updateGameStateById(game)
                        if (result === 1) {
                            return game
                        } else {
                            return Error("Failed to update game state")
                        }
                    }
                }
                case "down": {
                    if (current_pos.x == game.map.length - 1) {
                        return Error("Unable to move down. Already at the bottom.")
                    } else {
                        game.moves += game.map[current_pos.x + 1][current_pos.y].move_cost
                        game.health += game.map[current_pos.x + 1][current_pos.y].health_cost
                        game.player_location.x += 1

                        if (game.moves <= 0 || game.health <= 0) {
                            game.game_status = EGameStatus.LOSS
                        } else if (game.player_location.x == endLocation.x && game.player_location.y == endLocation.y) {
                            game.game_status = EGameStatus.WIN
                        }

                        const result = this.db.updateGameStateById(game)
                        if (result === 1) {
                            return game
                        } else {
                            return Error("Failed to update game state")
                        }
                    }
                }
                case "left": {
                    if (current_pos.y == 0) {
                        return Error("Unable to move down. Already at the left side.")
                    } else {
                        game.moves += game.map[current_pos.x][current_pos.y - 1].move_cost
                        game.health += game.map[current_pos.x][current_pos.y - 1].health_cost
                        game.player_location.y -= 1


                        if (game.moves <= 0 || game.health <= 0) {
                            game.game_status = EGameStatus.LOSS
                        } else if (game.player_location.x == endLocation.x && game.player_location.y == endLocation.y) {
                            game.game_status = EGameStatus.WIN
                        }

                        const result = this.db.updateGameStateById(game)
                        if (result === 1) {
                            return game
                        } else {
                            return Error("Failed to update game state")
                        }
                    }
                }
                case "right": {
                    if (current_pos.y == game.map.length - 1) {
                        return Error("Unable to move right. Already at the right side.")
                    } else {
                        game.moves += game.map[current_pos.x][current_pos.y + 1].move_cost
                        game.health += game.map[current_pos.x][current_pos.y + 1].health_cost
                        game.player_location.y += 1

                        if (game.moves <= 0 || game.health <= 0) {
                            game.game_status = EGameStatus.LOSS
                        } else if (game.player_location.x == endLocation.x && game.player_location.y == endLocation.y) {
                            game.game_status = EGameStatus.WIN
                        }

                        const result = this.db.updateGameStateById(game)
                        if (result === 1) {
                            return game
                        } else {
                            return Error("Failed to update game state")
                        }
                    }
                }
                default: {
                    return Error("Failed to update game state")
                }
            }
        } else {
            return Error(`User ID: ${playerId} does not have access to this game`)
        }
    }

    async getGameSolutionById(gameId: number): Promise<Error | TTile[]> {
        const game = this.db.getGameStateById(gameId)
        if (game instanceof GameState) {
            const gameMap = game.map
            const startPos = this.gridMapService.getStartLocation(gameMap)
            const endPos = this.gridMapService.getEndLocation(gameMap)
            const start = gameMap[startPos.x][startPos.y]
            const end = gameMap[endPos.x][endPos.y]
            return await aStar(start, end, gameMap)
        } else {
            return Error("Unable to solve.")
        }
    }

    async solveGameById(playerId: number, gameId: number, path: TTile[]): Promise<Error | GameState> {
        let result: Error | GameState = Error("I broke solving the game")
        let isWon = false
        try {
            while (!isWon) {
                let game = await this.getGameStateById(playerId, gameId) as GameState
                if (game.game_status == EGameStatus.WIN){
                    isWon = true
                    break
                }
                //Get an array of directions to go
                for (let tile of path) {
                    if (tile.x > game.player_location.x && tile.y === game.player_location.y) {
                        // down
                        result = await this.movePlayerInGameByID(game.player_id, game.id, "down")
                    } else if (tile.x < game.player_location.x && tile.y === game.player_location.y) {
                        // up
                        result = await this.movePlayerInGameByID(game.player_id, game.id, "up")
                    } else if (tile.x === game.player_location.x && tile.y > game.player_location.y) {
                        // right
                        result = await this.movePlayerInGameByID(game.player_id, game.id, "right")
                    } else if (tile.x === game.player_location.x && tile.y < game.player_location.y) {
                        //left
                        result = await this.movePlayerInGameByID(game.player_id, game.id, "left")
                    }
                }
            }
            return result
        } catch {
            return result
        }

    }
}



export default GameService