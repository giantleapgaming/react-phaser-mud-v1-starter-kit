
import { createCamera } from "./systems";
import { PhaserLayer } from "./createPhaserLayer";


export const registerSystems = (layer: PhaserLayer) => {
  createCamera(layer);
};
