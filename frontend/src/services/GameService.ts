import {GameData} from "../pages/MenuPage";
import {backend_url} from "../utils/env";

export default function useMoveCharacter() {

    async function moveCharacter(gameId: number, direction: string): Promise<GameData> {
        const response = await fetch(`${backend_url}/api/game/${gameId}/move/${direction}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response.json()
    }

    return {moveCharacter}
}