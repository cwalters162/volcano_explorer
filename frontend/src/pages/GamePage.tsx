import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {GameData } from "./MenuPage";
import {tempGameList} from "../mockData/gameDataArray";
import useMoveCharacter from "../services/GameService";

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
    const moveCharacter = useMoveCharacter()
    const gameId = location.state
    const [gameState, setGameState] = useState<GameData>()

    useEffect(() => {
        const gameData = tempGameList.find((game)=> gameId === game.id)
        if (gameData !== undefined) {
            setGameState(gameData)
        }
    }, []);

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

    return (
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
                                    {tile.x === gameState.player_location.x && tile.y === gameState.player_location.y && <span className="text-black">@</span>}
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
};
