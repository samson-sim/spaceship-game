import { Application } from 'pixi.js';

export interface GameState {
    playerPosition: number;
    app: Application | null;
    gameRunning: boolean;
    bulletsCount: number;
}

export interface Coordinates {
    x: number;
    y: number;
}
