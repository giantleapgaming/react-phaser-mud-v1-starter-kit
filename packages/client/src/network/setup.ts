import { setupMUDNetwork } from "@latticexyz/std-client";
import { SystemTypes } from "contracts/types/SystemTypes";
import { productionConfig } from "../mud/config";
import { contractComponents, clientComponents, world } from "../mud";
import { SystemAbis } from "contracts/types/SystemAbis.mjs";

export type SetupResult = Awaited<ReturnType<typeof setup>>;

export async function setup() {
  const result = await setupMUDNetwork<typeof contractComponents, SystemTypes>(
    productionConfig,
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
