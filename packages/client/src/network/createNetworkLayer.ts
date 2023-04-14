import { world } from "../mud";
import { setup } from "./setup";
import { createActionSystem } from "@latticexyz/std-client";
import { createNetworkUtils } from "./createNetworkUtils";

export type NetworkLayer = Awaited<ReturnType<typeof createNetworkLayer>>;

export const createNetworkLayer = async () => {
 const { components, network, txReduced$, } = await setup();
 const actions = createActionSystem(world, txReduced$);

 const layer = {
  world,
  network,
  components,
  actions,
 };

 const utils = createNetworkUtils(layer);

 return {
  ...layer,
  utils,
 };
};
