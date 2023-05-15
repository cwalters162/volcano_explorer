import {TTile} from "./Tile";
import {TPos} from "../services/GridMapService";

enum EGameStatus {
    PLAYING = "playing",
    WIN = "win",
    LOSS = "loss"
}

interface IGameState {
    id: number
    health: number,
    moves: number,
    map: TTile[][],
    player_id: number,
    player_location: TPos
    game_status: EGameStatus
}

class GameState implements IGameState {
    id: number
    health: number
    moves: number
    map: TTile[][]
    player_id: number
    player_location: TPos
    game_status: EGameStatus
    constructor(id: number, health: number, moves: number, map: TTile[][], player_id: number, start_location: TPos) {
        this.id = id
        this.health = health
        this.moves = moves
        this.map = map
        this.player_id = player_id
        this.player_location = start_location
        this.game_status = EGameStatus.PLAYING
    }
}

export default GameState