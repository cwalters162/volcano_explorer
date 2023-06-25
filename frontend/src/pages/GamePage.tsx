import React, { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import {GameData, MapItem, PlayerLocation} from "./MenuPage"; // Import the TileType enum

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
    const [map, setMap] = useState<MapItem[][]>([]);
    const [playerLocation, setPlayerLocation] = useState<PlayerLocation>({x:0, y:0});
    const location = useLocation()
    const gameData: GameData = location.state

    const gameMap = gameData.map

    console.log(gameMap)
    useEffect(() => {
        // Update the map state when the data changes
        setMap(gameMap);
        setPlayerLocation(gameData.player_location)
    }, []);

    // const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    //     const { key } = event;
    //
    //     // Handle arrow key presses and update the map accordingly
    //     // Replace the moved tile with the @ symbol
    //
    //     // Update the map state with the new map
    //     setMap((prevMap) => {
    //         // Perform necessary map updates based on key press
    //
    //         return updatedMap;
    //     });
    // };

    console.log(gameMap.length)

    return (
        <div className="flex justify-center h-screen" tabIndex={0}>
            <div className={`flex`}>
                {map.map((row, rowIndex) =>
                    <div>
                        {row.map((tile, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`text-center h-7 w-7 
                                        ${tile.type === TileType.Blank ? 'bg-green-500' : 
                                            tile.type === TileType.Speeder ? 'bg-yellow-500' : 
                                                tile.type === TileType.Lava ? 'bg-red-500' : 
                                                    tile.type === TileType.Mud ? 'bg-yellow-900' : 
                                                        tile.type === TileType.Start ? 'bg-purple-500' : 
                                                            tile.type === TileType.End ? 'bg-black' : ''}`}
                                >
                                    {/* Render additional content if needed */}
                                    {/*{tile.type === TileType.Start && <span className="text-white">Start</span>}*/}
                                    {/*{tile.type === TileType.End && <span className="text-white">End</span>}*/}
                                    {/* Render the @ symbol for the moved tile */}
                                    {tile.x === playerLocation.x && tile.y === playerLocation.y && <span className="text-black">@</span>}
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
};
