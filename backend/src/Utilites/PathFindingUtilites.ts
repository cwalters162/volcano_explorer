
import {TTile} from "../models/Tile";
import {TPos} from "../services/GridMapService";

export type Graph = {
    [key: string]: TPos[]
}

// Euclidean Distance
function Distance(tileA: TTile, tileB: TTile): number {
    const dx = tileA.x - tileB.x
    const dy = tileA.y - tileB.y
    return Math.sqrt(dx * dx + dy * dy)
}

function heuristic(tileA: TTile, tileB: TTile): number {
    const distance = Distance(tileA, tileB)
    const moveCost = tileA.move_cost
    const healthCost = tileA.health_cost
    const cost = (distance * 0.30) + Math.abs(healthCost * 0.50) + Math.abs(moveCost * 0.20)
    return cost
}

export async function aStar(start: TTile, end: TTile, world: TTile[][]): Promise<TTile[]> {
    const open_set = new Set<TTile>([start])
    const closed_set = new Set<TTile>()

    const came_from = new Map<TTile, TTile>()
    const g_score = new Map<TTile, number>()

    g_score.set(start, 0)
    const f_score = new Map<TTile, number>()
    f_score.set(start, heuristic(start, end))

    while (open_set.size > 0) {
        let current: TTile | null = null
        let current_f_score = Infinity
        let neighbors = []
        for (const tile of open_set) {
            const score = f_score.get(tile) || Infinity
            if (score < current_f_score) {
                current = tile
                current_f_score = score
            }
        }
        if (current != null) {
            for (let i = 0; i <= 4; i++) {
                if (current.x > 0) {
                    neighbors.push({x: current.x - 1, y: current.y});
                }
                if (current.x < world.length - 1) {
                    neighbors.push({x: current.x + 1, y: current.y});
                }
                if (current.y > 0) {
                    neighbors.push({x: current.x, y: current.y - 1});
                }
                if (current.y < world[current.x].length - 1) {
                    neighbors.push({x: current.x, y: current.y + 1});
                }
            }
        }

        if (!current) {
            return []
        }

        if (current === end) {
            const path = [end]
            while (came_from.has(path[0])) {
                path.unshift(came_from.get(path[0])!)
            }
            return path
        }

        open_set.delete(current)
        closed_set.add(current)

        for (const neighbor_location of neighbors) {
            const neighbor = world[neighbor_location.x][neighbor_location.y]
            if (closed_set.has(neighbor)) {
                continue
            }

            const tentative_g_score = ((g_score.get(current) || 0) + Distance(current, neighbor))

            if (!open_set.has(neighbor)) {
                open_set.add(neighbor)
            } else if (tentative_g_score >= (g_score.get(neighbor) || Infinity)) {
                continue
            }

            came_from.set(neighbor, current)
            g_score.set(neighbor, tentative_g_score)
            f_score.set(neighbor, tentative_g_score + heuristic(neighbor, end))
        }
    }
    return []
}