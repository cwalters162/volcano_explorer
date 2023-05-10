# Volcano Explorer Backend

## Endpoints

- `/new-game/:difficulty/`
  - Difficulty: easy, medium, hard 
- `/player/`
  - Returns the health and moves remaining from the player</p>
- `/player/move/:direction`
  - Direction: up, down, left, right 
- `/map/`
  - Returns the map with the player location</p>
  - Uses traditional ASCII characters for identification
    - '@' is the player
    - '.' is a blank tile
    - 'S' is a speeder tile
    - 'L' is a lava tile
    - 'M' is a mud tile
    - 'H' is the start tile
    - 'X' is the end tile 
- `/solve`
  - finds the shortest path from the start point to the end point. 
  - Currently does not take health/moves into account
- `/solve-until-win/:difficulty`
  - Keeps generating a new map and solves the map until the player wins. 
  - It then responds with the winning map
- `/api/world/`
  - Returns a JSON with the current world, player.
  - To be used with a custom frontend for a complete game stats.
  - Game can be played completely via HTTP endpoints without ever using this.