import {TTile} from "./Tile";
import {TPos} from "../services/GridMapService";
export enum EGameStatus {
    PLAYING = "playing",
    WIN = "win",
    LOSS = "loss"
}

export interface IGameDescription {
    id: number
    health: number,
    moves: number,
    game_status: EGameStatus,
    size: number,
}

interface IGameState extends IGameDescription{
    player_id: number,
    player_location: TPos
    map: TTile[][],
}

class GameState implements IGameState {
    id: number
    health: number
    moves: number
    player_id: number
    player_location: TPos
    game_status: EGameStatus
    size: number
    map: TTile[][]
    constructor(id: number, health: number, moves: number, player_id: number, start_location: TPos, map: TTile[][]) {
        this.id = id
        this.health = health
        this.moves = moves
        this.player_id = player_id
        this.player_location = start_location
        this.game_status = EGameStatus.PLAYING
        this.size = map.length
        this.map = map
    }
}

export default GameState