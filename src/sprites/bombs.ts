import { Application, Container, ContainerChild, Sprite } from 'pixi.js';
import { appConstants } from '../common/constants';
import { getTexture } from '../common/assets';
import { allTextureKeys } from '../common/textures';
import { Coordinates } from '../types';

let bombs: Container;
const bombSpeed = 1;

export const initBombs = (app: Application) => {
    bombs = new Container();
    bombs.label = appConstants.containers.bombs;

    app.stage.addChild(bombs);
};

export const clearBullets = () => {
    bombs.children.forEach((bomb) => {
        bombs.removeChild(bomb);
        bomb.destroy({ children: true });
    });
};

export const addBomb = (coordinates: Coordinates) => {
    const bomb = new Sprite(getTexture(allTextureKeys.bullet));

    bomb.anchor.set(0.5);
    bomb.position.set(coordinates.x, coordinates.y + 10);
    bomb.rotation = Math.PI;

    bombs.addChild(bomb);
};

export const destroyBomb = (bomb: ContainerChild) => {
    bombs.removeChild(bomb);
    bomb.destroy({ children: true });
};

export const bombTick = () => {
    if (bombs) {
        const toRemove: ContainerChild[] = [];

        bombs.children.forEach((bomb) => {
            bomb.position.y += bombSpeed;

            if (bomb.position.y > appConstants.size.height) {
                toRemove.push(bomb);
            }
        });

        toRemove.forEach((bomb) => {
            bombs.removeChild(bomb);
            bomb.destroy({ children: true });
        });
    }
};
