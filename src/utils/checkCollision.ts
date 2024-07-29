import { ContainerChild } from 'pixi.js';

export const checkCollision = (obj1: ContainerChild, obj2: ContainerChild) => {
    if (!obj1.position || !obj2.position) {
        return;
    }

    const bounds1 = obj1.getBounds();
    const bounds2 = obj2.getBounds();

    return (
        bounds1.x < bounds2.x + bounds2.width &&
        bounds1.y < bounds2.y + bounds2.height &&
        bounds2.x < bounds1.x + bounds1.width &&
        bounds2.y < bounds1.y + bounds1.height
    );
};
