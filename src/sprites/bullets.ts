import { Application, Container, ContainerChild, Sprite } from 'pixi.js';
import { appConstants } from '../common/constants';
import { getTexture } from '../common/assets';
import { allTextureKeys } from '../common/textures';
import { bulletShoot, gameOver } from '../common/eventHub';
import { Coordinates } from '../types';

let bullets: Container;
let timeout: number | null;
const bulletSpeed = 1;

export const initBullets = (app: Application) => {
    bullets = new Container();
    bullets.label = appConstants.containers.bullets;

    app.stage.addChild(bullets);
};

export const clearBullets = () => {
    bullets.children.forEach((child) => {
        bullets.removeChild(child);
        child.destroy({ children: true });
    });
};

export const addBullet = (coordinates: Coordinates) => {
    if (timeout) return;

    const bullet = new Sprite(getTexture(allTextureKeys.bullet));

    bullet.rotation = -Math.PI / 2;
    bullet.scale = 0.7;
    bullet.anchor.set(0.5);
    bullet.position.set(coordinates.x, coordinates.y - 50);

    bullets.addChild(bullet);

    bulletShoot();

    timeout = setTimeout(() => {
        timeout = null;
    }, appConstants.timeouts.playerShoots);
};

export const destroyBullet = (bullet: ContainerChild) => {
    bullets.removeChild(bullet);
    bullet.destroy({ children: true });
};

export const bulletTick = (bulletsCount: number) => {
    const toRemove: Container[] = [];

    bullets.children.forEach((bullet) => {
        bullet.position.y -= bulletSpeed * 2;
        if (bullet.position.y < 0) {
            toRemove.push(bullet);
        }
    });

    toRemove.forEach((bullet) => {
        bullets.removeChild(bullet);
        bullet.destroy({ children: true });
    });

    if (!bullets.children.length && !bulletsCount) {
        gameOver();
    }
};
