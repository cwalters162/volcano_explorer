import GameState from "./GameState";

type TUser = {
    name: string,
    password: string,
    game_state: GameState,
    won: number,
    loss: number,
}

class User implements TUser {
    name: string;
    password: string;
    game_state: GameState;
    won: number;
    loss: number;

    constructor(name: string, password: string, gameState: GameState) {
        this.name = name
        this.password = password
        this.game_state = gameState
        this.won = 0
        this.loss = 0
    }
}

export default User