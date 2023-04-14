import { setupMUDNetwork } from "@latticexyz/std-client";
import { SystemTypes } from "contracts/types/SystemTypes";
import { contractComponents, clientComponents, world } from "../mud";
import { SystemAbis } from "contracts/types/SystemAbis.mjs";
import { getNetworkConfig } from "../utils/getNetworkConfig";

export type SetupResult = Awaited<ReturnType<typeof setup>>;

export async function setup() {
  const config = getNetworkConfig()
  const result = await setupMUDNetwork<typeof contractComponents, SystemTypes>(
    config,
    world,
    contractComponents,
    SystemAbis
  );

  result.startSync();

  return {
    ...result,
    components: {
      ...result.components,
      ...clientComponents,
    },
  };

}
