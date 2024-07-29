import { Container, Graphics, Text } from 'pixi.js';
import { appConstants } from '../common/constants';

const youWinMessage = new Container();
youWinMessage.interactive = true;

const graphics = new Graphics();
graphics.lineStyle(1, 0xff00ff, 1);
graphics.beginFill(0x650a5a, 0.25);
graphics.drawRoundedRect(0, 0, 250, 100, 16);
graphics.endFill();

youWinMessage.addChild(graphics);

const text = new Text({ text: 'You Win' });
text.anchor.set(0.5);
text.x = 250 / 2;
text.y = 100 / 2;
youWinMessage.addChild(text);

export const getYouWin = () => {
    youWinMessage.position.x = appConstants.size.width / 2 - youWinMessage.width / 2;
    youWinMessage.position.y = appConstants.size.height / 2 - youWinMessage.height / 2;

    return youWinMessage;
};
