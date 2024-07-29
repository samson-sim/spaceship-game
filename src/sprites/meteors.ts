import { Application, Container, ContainerChild, Sprite } from 'pixi.js';
import { appConstants } from '../common/constants';
import { getTexture } from '../common/assets';
import { allTextureKeys } from '../common/textures';
import { getRandomIntFromInterval } from '../utils/getRandomIntFromInterval';
import { EventHub, meteorDestroyed, youWin } from '../common/eventHub';

let meteors: Container;

let meteorsCount = 5;

export const addMeteors = (app: Application) => {
    meteors = new Container();
    meteors.label = appConstants.containers.meteors;

    for (let index = 0; index < meteorsCount; index++) {
        const meteor = new Sprite(getTexture(allTextureKeys.meteor));

        meteor.scale = 0.3;
        meteor.position.x = getRandomIntFromInterval(0, appConstants.size.width - meteor.width);
        meteor.position.y = getRandomIntFromInterval(0, appConstants.size.height * 0.2);

        meteors.addChild(meteor);
    }

    app.stage.addChild(meteors);
};

export const destroyMeteor = (meteor: ContainerChild) => {
    meteors.removeChild(meteor);
    meteor.destroy({ children: true });
    meteorDestroyed();
};

EventHub.on(appConstants.events.meteorDestroyed, () => {
    meteorsCount -= 1;

    if (meteorsCount === 0) {
        youWin();
    }
});
