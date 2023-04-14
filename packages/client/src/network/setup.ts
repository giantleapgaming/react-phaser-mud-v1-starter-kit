import { setupMUDNetwork } from "@latticexyz/std-client";
import { createFastTxExecutor } from "@latticexyz/network";
import { SystemTypes } from "contracts/types/SystemTypes";
import { productionConfig } from "../mud/config";
import { contractComponents, clientComponents, world } from "../mud";
import { SystemAbis } from "contracts/types/SystemAbis.mjs";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract, Signer } from "ethers";

export type SetupResult = Awaited<ReturnType<typeof setup>>;

export async function setup() {
  const result = await setupMUDNetwork<typeof contractComponents, SystemTypes>(
    productionConfig,
    world,
    contractComponents,
    SystemAbis
  );

  result.startSync();
  const signer = result.network.signer.get();


  const fastTxExecutor =
    signer?.provider instanceof JsonRpcProvider
      ? await createFastTxExecutor(
        signer as Signer & { provider: JsonRpcProvider }
      )
      : null;

  return {
    ...result,
    components: {
      ...result.components,
      ...clientComponents,
    },
    fastTxExecutor,
  };

}
