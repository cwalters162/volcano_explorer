import {TTile} from "./Tile";
import {TPos} from "./Grid";


type TGameState = {
    health: number,
    moves: number,
    map: TTile[][],
    player_location: TPos
}

class GameState implements TGameState {
    health: number
    moves: number
    map: TTile[][]
    player_location: TPos
    constructor(health: number, moves: number, map: TTile[][], start_location: TPos) {
        this.health = health
        this.moves = moves
        this.map = map
        this.player_location = start_location
    }
}

export default GameState