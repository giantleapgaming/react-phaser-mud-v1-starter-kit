import { world } from "../mud";
import { setup } from "./setup";
import { getNetworkConfig } from "../utils/getNetworkConfig";
import { createActionSystem } from "@latticexyz/std-client";
import { IWorld__factory } from "contracts/types/ethers-contracts/factories/IWorld__factory";
import { createNetworkUtils } from "./createNetworkUtils";

export type NetworkLayer = Awaited<ReturnType<typeof createNetworkLayer>>;

export const createNetworkLayer = async () => {
 const { singletonEntity, components, network, worldSend, txReduced$, playerEntity, playerEntityId } = await setup();

 const config = getNetworkConfig();

 // Give components a Human-readable ID
 Object.entries(components).forEach(([name, component]) => {
  component.id = name;
 });

 // const signer = network.signer.get();
 // if (!signer) throw new Error("No signer found");

 // const worldContract = IWorld__factory.connect(config.worldAddress, signer);

 // const actions = createActionSystem(world, txReduced$);


 const layer = {
  world,
  // worldContract,
  worldSend,
  singletonEntity,
  network,
  components,
  // actions,
  playerEntity,
  playerEntityId,
 };

 const utils = createNetworkUtils(layer);

 return {
  ...layer,
  utils,
 };
};
