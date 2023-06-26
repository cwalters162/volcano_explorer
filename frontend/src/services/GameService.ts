import {GameData} from "../pages/MenuPage";
import {backend_url} from "../utils/env";

export default function useMoveCharacter() {

    async function moveCharacter(gameId: number, direction: string): Promise<GameData> {
        const response = await fetch(`http://localhost:3000/api/game/${gameId}/move/${direction}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        console.log("Response")
        const json = response.json()
        console.log(json)
        return json
    }

    return {moveCharacter}
}