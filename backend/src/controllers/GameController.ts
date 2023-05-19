import GameService, {ZEnumDifficultySchema} from "../services/GameService";
import {z} from "zod";
import GameState from "../models/GameState";

interface IGameController {
    createGame(playerId: number, createGameRequest: CreateGameRequest): Promise<Error | GameState>
    getAllGamesByUserId(playerId: number): Promise<Error | number[]>
}

class GameController implements IGameController {
    gameService: GameService

    constructor(gameService: GameService) {
        this.gameService = gameService
    }

    async createGame(playerId: number, createGameRequest: CreateGameRequest): Promise<Error | GameState> {
        const {size, playerHealth, playerMoves} = createGameRequest
        try {
            switch (createGameRequest.difficulty) {
                case "custom": {
                    return await this.gameService.createGame(playerId, size, playerHealth, playerMoves)
                }
                case "easy": {
                    return await this.gameService.createGame(playerId, 30)
                }
                case "medium": {
                    return await this.gameService.createGame(playerId, 50)
                }
                case "hard": {
                    return await this.gameService.createGame(playerId, 70)
                }
            }
        } catch (error) {
            return error as Error
        }
    }

    async getAllGamesByUserId(playerId: number): Promise<Error | number[]> {
        try {
            return this.gameService.getAllGamesByUserId(playerId)
        } catch {
            return Error(`Failed to get all the games belonging to user id: ${playerId}`)
        }
    }

    async getGameStateByID(userId: number, gameId: number): Promise<Error | GameState> {
        try {
            return this.gameService.getGameStateById(userId, gameId)
        } catch {
            return Error(`Failed to get game id: ${gameId} for player id: ${userId}`)
        }
    }
}

export const ZCreateGameRequestSchema = z.object({
    difficulty: ZEnumDifficultySchema,
    size: z.number().optional(),
    playerHealth: z.number().optional(),
    playerMoves: z.number().optional(),
})

export type CreateGameRequest = z.infer<typeof ZCreateGameRequestSchema>

export const ZEnumDirectionSchema = z.enum(["up", "down", "left", "right"])
export type EDirection = z.infer<typeof ZEnumDirectionSchema>

export default GameController