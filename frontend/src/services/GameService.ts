import {GameData} from "../pages/MenuPage";
import {backend_url} from "../utils/env";

export default function useMoveCharacter() {

    async function moveCharacter(gameId: number, direction: string): Promise<GameData> {
        const response = await fetch(`http://127.0.0.1:3000/api/${gameId}/move/${direction}`, {
            method: "POST",
            mode: "cors",
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