import { Application, Text, TextStyle } from 'pixi.js';

import { EventHub, gameOver } from '../common/eventHub';
import { appConstants } from '../common/constants';

let timeLeft = 60;
let timerText: Text;
let timerId: number;
let app: Application;

timerId = setInterval(updateTimer, 1000);

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerText.text = `Time Left: ${timeLeft}`;
    } else {
        gameOver();
    }
}

const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    stroke: { color: 'blue', width: 5, join: 'round' }
});

export const addTimer = (currApp: Application) => {
    app = currApp;
    timerText = new Text({
        text: `Time Left: ${timeLeft}`,
        style
    });
    timerText.x = 10;
    timerText.y = 10;

    app.stage.addChild(timerText);
};

EventHub.on(appConstants.events.gameOver, () => {
    clearTimeout(timerId);
});

EventHub.on(appConstants.events.youWin, () => {
    app.stage.removeChild(timerText);
    timerText.destroy({ children: true });
    clearTimeout(timerId);
});

EventHub.on(appConstants.events.endGame, () => {
    clearTimeout(timerId);
});

EventHub.on(appConstants.events.startBoss, () => {
    timeLeft = 60;
    timerText.text = `Time Left: ${timeLeft}`;
    timerId = setInterval(updateTimer, 1000);
});
