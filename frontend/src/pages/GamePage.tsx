import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {GameData } from "./MenuPage";
import useMoveCharacter from "../services/GameService";
import {backend_url} from "../utils/env";
import {useUI} from "../utils/UiProvider";

export enum TileType {
    Blank,
    Speeder,
    Lava,
    Mud,
    Start,
    End,
    Player
}

export default function GamePage(){
    const location = useLocation()
    const navigate = useNavigate()
    const { moveCharacter } = useMoveCharacter()
    const {setHealth, setMoves} = useUI()
    const gameId = location.state
    const [gameState, setGameState] = useState<GameData>()
    const [gameStatus, setGameStatus] = useState<string>("")

    useEffect(() => {
        (async ()=> {
            const response = await fetch(`${backend_url}/api/game/${gameId}`, {
                method: "GET",
                credentials: "include"
            })
            return await response.json()
        })().then((data)=> {
            setGameState(data)
            setGameStatus(data.game_status)
        })
    }, []);

    useEffect(() => {
        if (gameState) {
            setHealth(gameState.health);
            setMoves(gameState.moves);
        }
    }, [gameState, setHealth, setMoves]);

    function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
        const { key } = event
        switch(key) {
            case "w":
            case "W":
            case "ArrowUp": {
                console.log("Arrow Up")
                moveCharacter(gameId, "up").then((data) => {
                    setGameState(data)
                }).catch((error)=>{console.log(error)})
                break;
            }
            case "s":
            case "S":
            case "ArrowDown": {
                console.log("Arrow Down")
                moveCharacter(gameId, "down").then((data) => {
                    setGameState(data)
                }).catch((error)=>{console.log(error)})
                break;
            }
            case "a":
            case "A":
            case "ArrowLeft": {
                console.log("Arrow Left")
                moveCharacter(gameId, "left").then((data) => {
                    setGameState(data)
                }).catch((error)=>{console.log(error)})
                break;
            }
            case "d":
            case "D":
            case "ArrowRight": {
                console.log("Arrow Right")
                moveCharacter(gameId, "right").then((data) => {
                    setGameState(data)
                }).catch((error)=>{console.log(error)})
                break;
            }
        }
    }

    if (!gameState) {
        return <div> NO GAME FOUND </div>
    }

    let confetti_div = Array(50).fill(null);

    return (
        <>
            <div className="flex justify-center h-screen" tabIndex={0} onKeyDown={(e)=>handleKeyPress(e)}>
                <div className={`flex flex-col`}>
                    {gameState.map.map((row, rowIndex) =>
                        <div key={`${rowIndex}`} className={"flex"}>
                            {row.map((tile, colIndex) => (
                                    <div
                                        id={`${rowIndex}-${colIndex}`}
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`text-center h-7 w-7 
                                            ${tile.type === TileType.Blank ? 'bg-green-500' : 
                                                tile.type === TileType.Speeder ? 'bg-yellow-500' : 
                                                    tile.type === TileType.Lava ? 'bg-red-500' : 
                                                        tile.type === TileType.Mud ? 'bg-yellow-900' : 
                                                            tile.type === TileType.Start ? 'bg-purple-500' : 
                                                                tile.type === TileType.End ? 'bg-black' : ''}`}
                                    >
                                        {tile.x === gameState.player_location.x &&
                                            tile.y === gameState.player_location.y &&
                                            <span className={`${tile.type===TileType.End || tile.type === TileType.Mud ? 'text-white' : 'text-black'}`}
                                            >@</span>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
                {gameStatus === "win" && (
                    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
                        <div className="confetti-container z-50">
                            {confetti_div.map((_, index) => (
                                <div
                                    key={index}
                                    className="confetti"
                                    style={{
                                        top: `${Math.random() * 10}%`,
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${index * 0.1}s`, // Adjust the delay value as needed
                                    }}
                                />
                            ))}
                        </div>
                        <div className="text-center text-white">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl mb-8">Congratulations! You win!</h1>
                            <div className="mt-8">
                                <button className="px-4 py-2 mr-4 bg-blue-500 rounded text-white" onClick={() => navigate('/app/menu')}>Go to Menu</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
