import { Application, Sprite } from 'pixi.js';
import { appConstants } from '../common/constants';
import { getTexture } from '../common/assets';
import { allTextureKeys } from '../common/textures';
import { GameState } from '../types';
import { addBullet } from './bullets';

let player: Sprite;

export const addPlayer = (app: Application) => {
    if (player) {
        return player;
    }

    player = new Sprite(getTexture(allTextureKeys.spaceship));
    player.label = appConstants.containers.player;

    player.anchor.set(0.5);
    player.position.x = appConstants.size.width / 2;
    player.position.y = appConstants.size.height - 100;

    app.stage.addChild(player);
};

export const getPlayer = () => player;

export const playerShoots = () => {
    addBullet(player.position);
};

export const playerTick = (state: GameState) => {
    player.position.x = state.playerPosition;
};
