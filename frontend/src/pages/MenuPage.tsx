import React, {useEffect, useState} from "react";
import NewGameForm, {LoginFormData} from "../components/NewGameForm";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../utils/AuthProvider"
import gameDescriptionsData from "../mockData/getGameDescriptions";
import {backend_fqdn, backend_port, backend_url} from "../utils/env";

export interface GameDescription {
    id: number,
    health: number,
    moves: number,
    game_status: string,
    size: number,
}


interface newGameOptions {
    difficulty: string, // easy, medium, hard, or custom.
    size?: number, // optional used for custom.
    health?: number, //  optional used for custom.
    moves?: number // optional used for custom.
}

function getGameDescriptions(id: number) {
    const result = gameDescriptionsData
    return result
}

export default function MenuPage() {
    const {user} = useAuth()
    const [newGameOptions, setNewGameOptions] = useState<newGameOptions>()
    const navigate = useNavigate()
    const [gameDescriptions, setGameDescriptions] = useState<GameDescription[]>([])

    useEffect( () => {
        ( async () => {
            const response = await fetch(`${backend_url}/api/games`, {
                method: "GET",
                credentials: "include"
            })
            const result = await response.json()
            setGameDescriptions(result)
        })()


    }, [])

    async function handleSubmit(data: LoginFormData) {
        try {
            console.log(data)
            const response = await fetch(`http://${backend_fqdn}:${backend_port}/api/create-game`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.status == 200) {
                const result = await response.json();
                console.log(result)
                console.log("Success:", result);
                setGameDescriptions((previousGameDescriptions) => [...previousGameDescriptions, result])
            } else {
                console.log(response)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }


    if (user === null) {
        navigate("/")
        return <div>Failed to load user</div>
    }


    const activeGames = gameDescriptions.filter((game)=> game.game_status === "playing")
    const completedGames = gameDescriptions.filter((game)=>game.game_status !== "playing")

    function onItemClick(gameDescription: GameDescription){
        console.log("Navigating to app game")
        console.log(gameDescription)
        navigate('/app/game', { state: gameDescription.id})
    }

    return (
        <div className={"flex flex-wrap"}>
            <NewGameForm onSubmit={handleSubmit}/>
            <div className={"text-center sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3"}>
                <div className={"max-w-sm mx-auto"}>
                    <h2 className={"mb-4 text-xl font-medium"}>Playing Games</h2>

                    <ul className={"max-h-72 overflow-y-auto border border-gray-300 rounded-md"}>
                        {activeGames.map(gameDescription => (
                            <li
                                key={gameDescription.id}
                                className={"px-4 py-2 border-b border-gray-300 last:border-b-0 cursor-pointer hover:bg-amber-200"}
                                onClick={() => onItemClick(gameDescription)}
                            >
                                <div className="font-medium">Game ID: {gameDescription.id}</div>
                                <div className="font-medium">Health: {gameDescription.health}</div>
                                <div className="font-medium">Moves: {gameDescription.moves}</div>
                                <div className="font-medium">Size: {gameDescription.size}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={"text-center sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3"}>
                <div className={"max-w-sm mx-auto"}>
                    <h2 className={"mb-4 text-xl font-medium"}>Completed Games</h2>
                    <ul className={"max-h-72 overflow-y-auto border border-gray-300 rounded-md"}>
                        {completedGames.map(gameDescription => (
                            <li
                                key={gameDescription.id}
                                className={`px-4 py-2 border-b border-gray-300 last:border-b-0 ${gameDescription.game_status === "win" ? "bg-green-200" : "bg-red-200"}`}
                            >
                                <div className={"font-medium"}>Game ID: {gameDescription.id}</div>
                                <div className={"font-medium"}>Score: {gameDescription.health + gameDescription.moves}</div>
                                <div className={"font-medium"}>Result: {gameDescription.game_status}</div>
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
    map: MapItem[][];
}