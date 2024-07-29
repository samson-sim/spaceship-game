import { Assets } from 'pixi.js';
import { allTextureKeys, appTextures } from './textures';

Assets.add(appTextures);

const textures = new Map();

export const loadAssetsAsync = async () => {
    const keys = Object.values(allTextureKeys);

    const assets = await Assets.load([...keys]);

    Object.entries(assets).forEach(([key, value]) => {
        textures.set(key, value);
    });
};

export const getTexture = (id: string) => {
    if (textures.has(id)) {
        return textures.get(id);
    }

    return null;
};
