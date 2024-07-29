import { Application, Ticker } from 'pixi.js';
import { addStars } from './utils/addStars';
import { loadAssetsAsync } from './common/assets';
import { appConstants } from './common/constants';
import { addPlayer, getPlayer, playerShoots, playerTick } from './sprites/player';
import { GameState } from './types';
import { bulletTick, clearBullets, destroyBullet, initBullets } from './sprites/bullets';
import { addMeteors, destroyMeteor } from './sprites/meteors';
import { checkCollision } from './utils/checkCollision';
import { addTimer } from './sprites/timer';
import { bossShoot, EventHub, gameOver, startBoss } from './common/eventHub';
import { getGameOver } from './utils/getGameOver';
import { getYouWin } from './utils/getYouWin';
import { addBulletsCount, bulletsCountTick } from './sprites/bulletsCount';
import { bossTick, initBoss } from './sprites/boss';
import { bombTick, destroyBomb, initBombs } from './sprites/bombs';

const initialPlayerPosition = appConstants.size.width / 2;

const gameState: GameState = {
    playerPosition: initialPlayerPosition,
    app: null,
    gameRunning: true,
    bulletsCount: appConstants.defaultBulletsCount
};

// Create a PixiJS application.
const app = new Application();

const checkAllCollisions = () => {
    const bullets = app.stage.getChildByLabel(appConstants.containers.bullets);
    const bombs = app.stage.getChildByLabel(appConstants.containers.bombs);
    const meteors = app.stage.getChildByLabel(appConstants.containers.meteors);
    const boss = app.stage.getChildByLabel(appConstants.containers.boss);
    const player = app.stage.getChildByLabel(appConstants.containers.player);

    if (bullets && meteors) {
        bullets.children.forEach((bullet) => {
            meteors.children.forEach((meteor) => {
                if (checkCollision(bullet, meteor)) {
                    destroyBullet(bullet);
                    destroyMeteor(meteor);
                }
            });
        });
    }

    if (bullets && bombs) {
        bullets.children.forEach((bullet) => {
            bombs.children.forEach((bomb) => {
                if (checkCollision(bullet, bomb)) {
                    destroyBullet(bullet);
                    destroyBomb(bomb);
                }
            });
        });
    }

    if (bullets && boss) {
        bullets.children.forEach((bullet) => {
            boss.children.forEach((boss) => {
                if (checkCollision(bullet, boss)) {
                    destroyBullet(bullet);
                    bossShoot();
                }
            });
        });
    }

    if (player && bombs) {
        bombs.children.forEach((bomb) => {
            if (checkCollision(player, bomb)) {
                gameOver();
            }
        });
    }
};

const createScene = async () => {
    await app.init({
        background: '#021f4b',
        width: appConstants.size.width,
        height: appConstants.size.height
    });
    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    gameState.app = app;
    app.stage.interactive = true;
    app.stage.hitArea = app.screen;

    initBullets(app);
    addPlayer(app);
    addStars(app);
    addMeteors(app);
    addTimer(app);
    addBulletsCount(app);
};

const initInteraction = () => {
    gameState.playerPosition = getPlayer().position.x;

    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowLeft') {
            if (gameState.playerPosition > 100) {
                gameState.playerPosition -= 20;
            }
        }

        if (e.code === 'ArrowRight') {
            if (gameState.playerPosition < appConstants.size.width - 100) {
                gameState.playerPosition += 20;
            }
        }

        if (e.code === 'Space') {
            if (gameState.bulletsCount) {
                playerShoots();
            }
        }
    });

    app.ticker.add((ticker: Ticker) => {
        if (gameState.gameRunning) {
            playerTick(gameState);
            bulletTick(gameState.bulletsCount);
            bulletsCountTick(gameState.bulletsCount);
            checkAllCollisions();
            bossTick(ticker.deltaTime);
            bombTick();
        }
    });
};

// Asynchronous IIFE
(async () => {
    await loadAssetsAsync();
    await createScene();
    initInteraction();
})();

EventHub.on(appConstants.events.gameOver, () => {
    app.stage.addChild(getGameOver());
    gameState.gameRunning = false;
});

EventHub.on(appConstants.events.bulletShoot, () => {
    gameState.bulletsCount -= 1;
});

EventHub.on(appConstants.events.endGame, () => {
    const youWinSprite = getYouWin();

    app.stage.addChild(youWinSprite);

    gameState.gameRunning = false;
});

EventHub.on(appConstants.events.youWin, () => {
    console.log('clear');
    clearBullets();
    const youWinSprite = getYouWin();
    app.stage.addChild(youWinSprite);
    gameState.gameRunning = false;

    setTimeout(() => {
        app.stage.removeChild(youWinSprite);

        gameState.gameRunning = true;
        gameState.playerPosition = initialPlayerPosition;
        gameState.bulletsCount = appConstants.defaultBulletsCount;

        startBoss();

        addTimer(app);
    }, 1000);
});

EventHub.on(appConstants.events.startBoss, () => {
    initBoss(app);
    initBombs(app);
});
