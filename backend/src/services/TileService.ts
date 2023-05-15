import {
    BlankTile,
    LavaTile,
    MudTile,
    SpeederTile,
    TileType,
    TTile
} from "../models/Tile";

interface ITileService {
    createTile(x: number, y: number): TTile
}

class TileService implements ITileService {
    createTile(x: number, y: number): TTile {
        const number_of_tile_types = Object.keys(TileType).length / 2;
        const tile_selector = Math.floor(Math.random() * number_of_tile_types - 2)
        switch (tile_selector) {
            case 0:
                return new BlankTile(x, y)
            case 1:
                return new SpeederTile(x, y)
            case 2:
                return new LavaTile(x, y)
            case 3:
                return new MudTile(x, y)
            default:
                return new BlankTile(x, y)
        }
    }
}
export default TileService