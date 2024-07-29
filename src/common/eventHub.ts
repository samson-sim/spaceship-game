import { EventEmitter } from 'pixi.js';
import { appConstants } from './constants';

export const EventHub = new EventEmitter();

export const youWin = () => {
    EventHub.emit(appConstants.events.youWin);
};

export const endGame = () => {
    EventHub.emit(appConstants.events.endGame);
};

export const meteorDestroyed = () => {
    EventHub.emit(appConstants.events.meteorDestroyed);
};

export const bulletShoot = () => {
    EventHub.emit(appConstants.events.bulletShoot);
};

export const gameOver = () => {
    EventHub.emit(appConstants.events.gameOver);
};

export const startBoss = () => {
    EventHub.emit(appConstants.events.startBoss);
};

export const bossShoot = () => {
    EventHub.emit(appConstants.events.bossShoot);
};
