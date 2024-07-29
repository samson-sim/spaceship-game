import { Application, Container, Graphics, Sprite } from 'pixi.js';
import { appConstants } from '../common/constants';
import { getTexture } from '../common/assets';
import { allTextureKeys } from '../common/textures';
import { getRandomIntFromInterval } from '../utils/getRandomIntFromInterval';
import { addBomb } from './bombs';
import { endGame, EventHub } from '../common/eventHub';

interface Boss extends Sprite {
    customData?: {
        left: boolean;
        hp: number;
        hpBar: Graphics;
    };
}

let bossContainer: Container;
let boss: Boss;

let elapsedTime = 0;
const interval = 2000;

export const addBoss = () => {
    boss = new Sprite(getTexture(allTextureKeys.boss));
    boss.anchor.set(0.5, 0.2);

    boss.x = getRandomIntFromInterval(20, appConstants.size.width - 20);
    boss.y = 80;
    boss.scale.set(0.5);

    // Create HP bar
    const hpBar = new Graphics();
    hpBar.beginFill(0xff0000); // Red color for HP bar
    hpBar.drawRect(-25, -40, 100, 5); // Adjust size and position of HP bar
    hpBar.endFill();

    boss.customData = {
        left: true,
        hp: appConstants.probability.initialHp,
        hpBar: hpBar
    };

    boss.addChild(hpBar);
    bossContainer.addChild(boss);
};

export const initBoss = (app: Application) => {
    bossContainer = new Container();
    bossContainer.label = appConstants.containers.boss;
    addBoss();

    app.stage.addChild(bossContainer);
};

export const destroyBoss = (boss: Boss) => {
    bossContainer.removeChild(boss);
    boss.destroy({ children: true });
};

export const bossTick = (delta: number) => {
    if (bossContainer) {
        bossContainer.children.forEach((e) => {
            let directionChanged = false;
            const boss = e as Boss;

            if (boss.customData) {
                if (boss.customData.left) {
                    boss.position.x -= 1;
                    if (boss.position.x < 20) {
                        boss.customData.left = false;
                        directionChanged = true;
                    }
                } else {
                    boss.position.x += 1;
                    if (boss.position.x > appConstants.size.width - 20) {
                        boss.customData.left = true;
                        directionChanged = true;
                    }
                }

                if (
                    !directionChanged &&
                    Math.random() * 100 < appConstants.probability.bossChangeDirection
                ) {
                    boss.customData.left = !boss.customData.left;
                }

                elapsedTime += delta * 16.66; // Convert delta to milliseconds

                if (elapsedTime >= interval) {
                    addBomb(boss.position);

                    elapsedTime = 0; // Reset elapsed time
                }

                // Update HP bar
                const hpPercentage = boss.customData.hp / appConstants.probability.initialHp;

                boss.customData.hpBar.clear();
                boss.customData.hpBar.beginFill(0xff0000); // Red color for HP bar
                boss.customData.hpBar.drawRect(-25, -40, 100 * hpPercentage, 5); // Adjust size based on HP percentage
                boss.customData.hpBar.endFill();
            }
        });
    }
};

EventHub.on(appConstants.events.bossShoot, () => {
    console.log('hp before', boss.customData?.hp);

    if (boss.customData) {
        boss.customData.hp -= 1;

        if (boss.customData.hp === 0) {
            endGame();
        }

        const hpPercentage = boss.customData.hp / appConstants.probability.initialHp;
        console.log('hp percent', hpPercentage);

        boss.customData.hpBar.clear();
        boss.customData.hpBar.beginFill(0xff0000); // Red color for HP bar
        boss.customData.hpBar.drawRect(-25, -40, 100 * hpPercentage, 5); // Adjust size based on HP percentage
        boss.customData.hpBar.endFill();
    }
});
