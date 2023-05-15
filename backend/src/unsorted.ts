// import {TTile} from "./models/Tile";
//
// export function renderWorld(player: Player, world: TTile[][]): string[] {
//
//     return world.flatMap((col, x) => {
//         return col.flatMap((tile, y) => {
//             if (x == player.location.x && y == player.location.y) {
//                 return player.symbol
//             } else {
//                 return tile.symbol
//             }
//         }).join('')
//     })
// }
//
// export function replaceWorldPathWithPounds(world: TTile[][], path: TTile[]) {
//     let modified_world = world;
//     path.map( path_tile=> {
//         modified_world.map((row: TTile[]) => row.map( (tile: TTile) => {
//             if (path_tile === tile) {
//                 tile.symbol = '#'
//                 return
//             }
//         }))
//     })
//     return modified_world
// }

// function addNeighbors(grid: TTile[][]) {
//     for (let x = 0; x < grid.length; x++) {
//         for (let y = 0; y < grid[x].length; y++) {
//             const tile = grid[x][y];
//             const neighbors: TPos[] = [];
//
//             if (x > 0) {
//                 neighbors.push({x: x - 1, y: y});
//             }
//             if (x < grid.length - 1) {
//                 neighbors.push({x: x + 1, y: y});
//             }
//             if (y > 0) {
//                 neighbors.push({x: x, y: y - 1});
//             }
//             if (y < grid[x].length - 1) {
//                 neighbors.push({x: x, y: y + 1});
//             }
//
//             tile.neighbors = neighbors;
//         }
//     }
// }