import { world } from "../mud";
import { setup } from "./setup";
import { getNetworkConfig } from "../utils/getNetworkConfig";
import { createActionSystem } from "@latticexyz/std-client";
import { createNetworkUtils } from "./createNetworkUtils";

export type NetworkLayer = Awaited<ReturnType<typeof createNetworkLayer>>;

export const createNetworkLayer = async () => {
 const { singletonEntity, components, network, txReduced$, playerEntity, playerEntityId } = await setup();

 const config = getNetworkConfig();

 // Give components a Human-readable ID
 Object.entries(components).forEach(([name, component]) => {
  component.id = name;
 });

 const signer = network.signer.get();
 if (!signer) throw new Error("No signer found");


 const actions = createActionSystem(world, txReduced$);


 const layer = {
  world,
  singletonEntity,
  network,
  components,
  actions,
  playerEntity,
  playerEntityId,
 };

 const utils = createNetworkUtils(layer);

 return {
  ...layer,
  utils,
 };
};
