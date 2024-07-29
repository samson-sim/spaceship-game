import { Application, Text, TextStyle } from 'pixi.js';

import { appConstants } from '../common/constants';

let countText: Text;

const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    stroke: { color: 'blue', width: 5, join: 'round' }
});

export const addBulletsCount = (app: Application) => {
    countText = new Text({
        text: '',
        style
    });

    countText.y = 10;

    app.stage.addChild(countText);
};

export const bulletsCountTick = (bulletsCount: number) => {
    countText.text = `${bulletsCount}/${appConstants.defaultBulletsCount}`;
    countText.x = appConstants.size.width - countText.width - 10;
};
