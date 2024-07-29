import { Container, Graphics, Text } from 'pixi.js';
import { appConstants } from '../common/constants';

const gameOverMessage = new Container();
gameOverMessage.interactive = true;

const graphics = new Graphics();
graphics.lineStyle(1, 0xff00ff, 1);
graphics.beginFill(0x650a5a, 0.25);
graphics.drawRoundedRect(0, 0, 250, 100, 16);
graphics.endFill();

gameOverMessage.addChild(graphics);

const text = new Text({ text: 'Game Over' });
text.anchor.set(0.5);
text.x = 250 / 2;
text.y = 100 / 2;
gameOverMessage.addChild(text);
// gameOverMessage.on('pointertap', () => {
//     restartGame(appConstants.events.gameOver);
// });

export const getGameOver = () => {
    gameOverMessage.position.x = appConstants.size.width / 2 - gameOverMessage.width / 2;
    gameOverMessage.position.y = appConstants.size.height / 2 - gameOverMessage.height / 2;
    return gameOverMessage;
};
