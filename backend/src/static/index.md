# Volcano Explorer
## Endpoints
### /
This page
### /user
POST 
Request 
```json 
{ 
  "name": string, 
  "password": string
}
```
Response
```Json 
{
    "id": number,
    "name": string,
    "won": number,
    "loss": number
}
```
### /login
POST
Request
```json 
{ "name": string, "password": string }
```
Response
```json 
{
  "id": number,
  "name": string,
  "won": number,
  "loss": number
}
```
## MUST BE LONGED IN FOR FURTHER ENDPOINTS
### /api/creategame
POST
Request
```json 
{ 
  "difficulty": string, // easy, medium, hard, or custom.
  "size": number, // optional used for custom.
  "health": number, //  optional used for custom.
  "moves": number // optional used for custom.
}
```
Response

```json 
{
  "id": number,
  "health": number,
  "moves": number,
  "player_id": number,
  "player_location": {
    "x": number,
    "y": number
  },
  "game_status": string // playing, win, or loss.
  "map": [
    {
      "type": number,
      "health_cost": number,
      "move_cost": number,
      "symbol": string,
      "x": number,
      "y": number
    }
  ]
}
```

### /api/games
GET
Request
```json
[
  number
]
```

### /api/game/:gameId
GET

`gameId` must be a number

Response
```json 
{
  "id": number,
  "health": number,
  "moves": number,
  "player_id": number,
  "player_location": {
    "x": number,
    "y": number
  },
  "game_status": string // playing, win, or loss.
  "map": [
    {
      "type": number,
      "health_cost": number,
      "move_cost": number,
      "symbol": string,
      "x": number,
      "y": number
    }
  ]
}
```

### /api/game/:gameId/move/:direction
POST

`gameId` must be a number

`direction` must be `"up"`, `"down"`, `"left"`, or `"right"`

Response
```json 
{
  "id": number,
  "health": number,
  "moves": number,
  "player_id": number,
  "player_location": {
    "x": number,
    "y": number
  },
  "game_status": string // playing, win, or loss.
  "map": [
    {
      "type": number,
      "health_cost": number,
      "move_cost": number,
      "symbol": string,
      "x": number,
      "y": number
    }
  ]
}
```

### /api/game/:gameId/solution
GET

`gameId` must be a number

Response
```json
[
  {
    "type": number,
    "health_cost": number,
    "move_cost": number,
    "symbol": string,
    "x": number,
    "y": number
  },
  {
    "type": number,
    "health_cost": number,
    "move_cost": number,
    "symbol": string,
    "x": number,
    "y": number
  }
]
  
```
### /api/game/:gameId/auto-solve // ONLY IN DEVELOPMENT could be enabled on production if value is found in an auto solution
GET

`gameId` must be a number

Response

```json
{
  "id": number,
  "health": number,
  "moves": number,
  "player_id": number,
  "player_location": {
    "x": number,
    "y": number
  },
  "game_status": string // playing, win, or loss.
  "map": [
    {
      "type": number,
      "health_cost": number,
      "move_cost": number,
      "symbol": string,
      "x": number,
      "y": number
    }
  ]
}
```