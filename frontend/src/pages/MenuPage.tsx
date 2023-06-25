import {backend_port, backend_url} from "../utils/env";
import React, {useState} from "react";
import NewGameForm from "../components/NewGameForm";

interface newGameOptions {
    difficulty: string, // easy, medium, hard, or custom.
    size?: number, // optional used for custom.
    health?: number, //  optional used for custom.
    moves?: number // optional used for custom.
}

export default function MenuPage() {
    const [newGameOptions, setNewGameOptions] = useState<newGameOptions>()

    const activeGames = tempGameList.filter((game)=> game.game_status === "playing")
    const completedGames = tempGameList.filter((game)=>game.game_status !== "playing")
    async function handleCreateGame(): Promise<void> {
        try {
            const response = await fetch(`http://${backend_url}:${backend_port}/api/creategame`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newGameOptions),
            });
            if (response.status == 200) {
                const result = await response.json();
                console.log("Success:", result);
            } else {
                console.log(response)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function onItemClick(game: GameData){
        console.log(game)
    }

    return (
        <div className={"grid grid-flow-col"}>
            <div className={"text-center"}>
                <NewGameForm/>
            </div>
            <div className={"text-center"}>
                <div className="max-w-sm mx-auto">
                    <h2 className="mb-4 text-xl font-medium">Playing Games</h2>

                    <ul className="max-h-72 overflow-y-auto border border-gray-300 rounded-md">
                        {activeGames.map(game => (
                            <li
                                key={game.id}
                                className="px-4 py-2 border-b border-gray-300 last:border-b-0 cursor-pointer hover:bg-amber-200"
                                onClick={() => onItemClick(game)}
                            >
                                <div className="font-medium">Game ID: {game.id}</div>
                                <div className="font-medium">Health: {game.health}</div>
                                <div className="font-medium">Moves: {game.moves}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={"text-center"}>
                <div className={"max-w-sm mx-auto"}>
                    <h2 className={"mb-4 text-xl font-medium"}>Completed Games</h2>
                    <ul className={"max-h-72 overflow-y-auto border border-gray-300 rounded-md"}>
                        {completedGames.map(game => (
                            <li
                                key={game.id}
                                className={`px-4 py-2 border-b border-gray-300 last:border-b-0 ${game.game_status === "won" ? "bg-green-200" : "bg-red-200"}`}
                            >
                                <div className={"font-medium"}>Game ID: {game.id}</div>
                                <div className={"font-medium"}>Score: {game.health + game.moves}</div>
                                <div className={"font-medium"}>Result: {game.game_status}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export interface PlayerLocation {
    x: number;
    y: number;
}

export interface MapItem {
    type: number;
    health_cost: number;
    move_cost: number;
    symbol: string;
    x: number;
    y: number;
}

export interface GameData {
    id: number;
    health: number;
    moves: number;
    player_id: number;
    player_location: PlayerLocation;
    game_status: string;
    map: MapItem[];
}

const tempGameList = [
    {
        "id": 1,
        "health": 200,
        "moves": 450,
        "player_id": 1,
        "player_location": {
            "x": 0,
            "y": 22
        },
        "game_status": "loss",
        "map": [
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 0,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 5
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 0,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 0,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 0,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 21
                },
                {
                    "type": 4,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": "H",
                    "x": 0,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 0,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 0,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 4
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 1,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 1,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 1,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 12
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 1,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 1,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 21
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 1,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 1,
                    "y": 23
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 1,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 2
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 11
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 15
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 25
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 29
                }
            ],
            [
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 5
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 3,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 12
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 3,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 25
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 27
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 8
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 12
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 13
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 29
                }
            ],
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 5,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 5,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 5,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 11
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 20
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 25
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 26
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 27
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 4
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 7
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 6,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 25
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 27
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 29
                }
            ],
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 5
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 8
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 10
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 12
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 7,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 15
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 23
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 7,
                    "y": 25
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 7,
                    "y": 26
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 8,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 8,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 12
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 8,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 8,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 23
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 29
                }
            ],
            [
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 9,
                    "y": 2
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 9,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 9,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 9,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 23
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 9,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 9,
                    "y": 25
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 26
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 10,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 5
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 10,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 10,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 10,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 10,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 12
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 10,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 10,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 10,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 10,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 22
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 10,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 11
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 12,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 5
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 12,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 11
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 12,
                    "y": 25
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 26
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 2
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 4
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 12
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 19
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 13,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 22
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 11
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 14
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 23
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 25
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 2
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 15,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 10
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 14
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 15
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 15,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 25
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 15,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 29
                }
            ],
            [
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 4
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 5
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 8
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 10
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 21
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 10
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 5
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 0
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 2
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 19,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 19,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 5
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 19,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 19,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 12
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 15
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 19,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 19,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 19,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 19,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 19,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 20,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 20,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 20,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 19
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 20,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 20,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 20,
                    "y": 25
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 0
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 8
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 19
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 25
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 22,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 22,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 22,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 22,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 12
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 22,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 19
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 22,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 22,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 22,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 22,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 22,
                    "y": 29
                }
            ],
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 23,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 23,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 23,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 8
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 11
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 23,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 13
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 23,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 15
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 23,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 23,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 23,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 23,
                    "y": 27
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 23,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 23,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 24,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 24,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 11
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 24,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 24,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 24,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 24,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 24,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 26
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 24,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 29
                }
            ],
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 12
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 19
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 5
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 8
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 26,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 26
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 27,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 7
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 27,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 27,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 19
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 27,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 27,
                    "y": 23
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 27,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 27,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 27,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 4
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 28,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 28,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 29
                }
            ],
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 1
                },
                {
                    "type": 5,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": "Z",
                    "x": 29,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 5
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 8
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 11
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 15
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 19
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 25
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 29
                }
            ]
        ]
    },
    {
        "id": 2,
        "health": 200,
        "moves": 450,
        "player_id": 1,
        "player_location": {
            "x": 0,
            "y": 10
        },
        "game_status": "won",
        "map": [
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 0,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 0,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 0,
                    "y": 9
                },
                {
                    "type": 4,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": "H",
                    "x": 0,
                    "y": 10
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 14
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 0,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 0,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 0,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 22
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 0,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 1,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 1,
                    "y": 5
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 1,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 10
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 1,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 21
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 1,
                    "y": 22
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 2
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 8
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 10
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 14
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 29
                }
            ],
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 0
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 3,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 3,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 3,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 14
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 3,
                    "y": 15
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 3,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 3,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 3,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 4
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 10
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 12
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 15
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 19
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 27
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 5,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 4
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 5,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 5,
                    "y": 19
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 5,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 25
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 5,
                    "y": 26
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 27
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 5,
                    "y": 29
                }
            ],
            [
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 5
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 6,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 6,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 6,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 29
                }
            ],
            [
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 7,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 7,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 4
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 12
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 7,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 8
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 14
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 8,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 9,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 11
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 13
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 9,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 22
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 9,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 25
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 9,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 9,
                    "y": 29
                }
            ],
            [
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 10,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 10,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 8
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 10,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 10
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 10,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 12
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 10,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 10,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 10,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 2
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 8
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 15
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 20
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 25
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 12,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 12,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 12,
                    "y": 7
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 12,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 15
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 12,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 12,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 12,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 13,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 20
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 13,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 8
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 13
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 15
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 4
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 8
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 15,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 10
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 15,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 25
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 15,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 29
                }
            ],
            [
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 8
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 10
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 20
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 25
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 29
                }
            ],
            [
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 22
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 25
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 29
                }
            ],
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 5
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 12
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 15
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 20
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 21
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 0
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 19,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 5
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 19,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 19,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 19,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 25
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 19,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 20,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 20,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 14
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 25
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 20,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 20,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 7
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 10
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 22,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 22,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 14
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 22,
                    "y": 15
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 22,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 22,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 22,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 0
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 23,
                    "y": 2
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 23,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 4
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 23,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 23,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 7
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 23,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 23,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 23,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 20
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 23,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 23,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 29
                }
            ],
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 24,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 10
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 12
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 24,
                    "y": 13
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 24,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 24,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 24,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 0
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 8
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 15
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 26,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 26,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 13
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 15
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 26,
                    "y": 27
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 27,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 5
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 27,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 27,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 27,
                    "y": 10
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 27,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 27,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 27,
                    "y": 15
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 27,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 20
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 21
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 27,
                    "y": 22
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 27,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 25
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 27,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 4
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 12
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 20
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 28,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 28,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 28,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 29
                }
            ],
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 5
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 12
                },
                {
                    "type": 5,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": "Z",
                    "x": 29,
                    "y": 13
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 26
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 29
                }
            ]
        ]
    },
    {
        "id": 3,
        "health": 200,
        "moves": 450,
        "player_id": 1,
        "player_location": {
            "x": 0,
            "y": 24
        },
        "game_status": "playing",
        "map": [
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 0,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 0,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 0,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 0,
                    "y": 15
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 0,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 22
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 23
                },
                {
                    "type": 4,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": "H",
                    "x": 0,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 0,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 0,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 0
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 1,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 1,
                    "y": 2
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 1,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 1,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 7
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 1,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 12
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 1,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 15
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 1,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 1,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 1,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 1,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 25
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 1,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 27
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 1,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 1,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 0
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 2
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 5
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 7
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 22
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 23
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 2,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 2,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 2,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 2,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 2
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 5
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 3,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 3,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 3,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 23
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 3,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 25
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 3,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 27
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 3,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 3,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 5
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 15
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 4,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 25
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 4,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 4,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 4,
                    "y": 29
                }
            ],
            [
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 5,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 5
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 5,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 5,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 21
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 5,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 23
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 25
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 5,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 5,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 5,
                    "y": 29
                }
            ],
            [
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 6,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 5
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 6,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 12
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 6,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 15
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 6,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 19
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 6,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 6,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 25
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 6,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 6,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 6,
                    "y": 29
                }
            ],
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 7,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 7,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 8
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 10
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 7,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 7,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 7,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 25
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 7,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 7,
                    "y": 27
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 7,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 8,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 8,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 12
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 8,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 8,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 8,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 20
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 8,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 8,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 8,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 8,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 8,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 9,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 9,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 9,
                    "y": 25
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 26
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 9,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 9,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 10,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 10,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 10,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 10,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 10,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 22
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 23
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 10,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 10,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 5
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 10
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 15
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 21
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 11,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 11,
                    "y": 27
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 11,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 11,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 7
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 12,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 23
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 12,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 25
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 12,
                    "y": 27
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 12,
                    "y": 29
                }
            ],
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 13,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 13,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 22
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 13,
                    "y": 25
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 13,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 13,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 13,
                    "y": 29
                }
            ],
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 10
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 12
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 14,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 20
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 14,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 14,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 14,
                    "y": 29
                }
            ],
            [
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 15,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 15,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 15,
                    "y": 7
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 15,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 19
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 25
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 15,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 15,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 15,
                    "y": 28
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 15,
                    "y": 29
                }
            ],
            [
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 6
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 12
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 15
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 17
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 16,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 25
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 16,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 16,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 16,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 4
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 19
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 17,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 17,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 17,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 17,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 1
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 2
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 5
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 8
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 10
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 11
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 12
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 14
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 22
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 18,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 18,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 18,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 18,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 0
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 19,
                    "y": 7
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 19,
                    "y": 8
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 19,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 19,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 19,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 19,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 21
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 19,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 19,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 19,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 26
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 19,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 19,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 20,
                    "y": 1
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 20,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 20,
                    "y": 10
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 12
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 21
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 20,
                    "y": 22
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 20,
                    "y": 25
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 26
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 20,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 2
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 4
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 5
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 9
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 12
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 20
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 21,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 23
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 21,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 21,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 21,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 6
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 22,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 22,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 20
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 22,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 24
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 22,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 22,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 22,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 22,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 22,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 8
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 23,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 16
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 23,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 25
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 23,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 23,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 24,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 24,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 7
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 24,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 24,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 16
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 24,
                    "y": 17
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 24,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 24,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 24,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 25
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 24,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 24,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 24,
                    "y": 29
                }
            ],
            [
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 0
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 3
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 11
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 18
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 20
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 25,
                    "y": 21
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 22
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 23
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 25
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 25,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 25,
                    "y": 27
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 28
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 25,
                    "y": 29
                }
            ],
            [
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 0
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 1
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 2
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 26,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 9
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 10
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 26,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 13
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 15
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 26,
                    "y": 19
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 26,
                    "y": 21
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 23
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 26,
                    "y": 24
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 26
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 26,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 26,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 0
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 27,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 2
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 27,
                    "y": 3
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 4
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 5
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 6
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 27,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 9
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 11
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 12
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 27,
                    "y": 13
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 14
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 27,
                    "y": 15
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 16
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 18
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 20
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 27,
                    "y": 27
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 27,
                    "y": 28
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 27,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 0
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 28,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 3
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 28,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 7
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 10
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 11
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 13
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 14
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 28,
                    "y": 15
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 17
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 18
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 28,
                    "y": 19
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 28,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 22
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 24
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 28,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 26
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 28,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 28,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 28,
                    "y": 29
                }
            ],
            [
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 0
                },
                {
                    "type": 5,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": "Z",
                    "x": 29,
                    "y": 1
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 2
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 3
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 4
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 5
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 6
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 7
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 8
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 9
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 10
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 11
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 12
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 13
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 14
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 15
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 16
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 17
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 18
                },
                {
                    "type": 3,
                    "health_cost": -10,
                    "move_cost": -5,
                    "symbol": "M",
                    "x": 29,
                    "y": 19
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 20
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 21
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 22
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 23
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 24
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 25
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 26
                },
                {
                    "type": 1,
                    "health_cost": -5,
                    "move_cost": 0,
                    "symbol": "S",
                    "x": 29,
                    "y": 27
                },
                {
                    "type": 2,
                    "health_cost": -50,
                    "move_cost": -10,
                    "symbol": "L",
                    "x": 29,
                    "y": 28
                },
                {
                    "type": 0,
                    "health_cost": 0,
                    "move_cost": -1,
                    "symbol": ".",
                    "x": 29,
                    "y": 29
                }
            ]
        ]
    }
] as unknown as GameData[]