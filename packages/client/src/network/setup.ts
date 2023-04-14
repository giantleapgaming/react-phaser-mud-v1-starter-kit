import { IWorld__factory } from './../../../contracts/types/ethers-contracts/factories/IWorld__factory';
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

 const worldContract = IWorld__factory.connect(
  productionConfig.worldAddress,
  signer ?? result.network.providers.get().json
 );
 const fastTxExecutor =
  signer?.provider instanceof JsonRpcProvider
   ? await createFastTxExecutor(
    signer as Signer & { provider: JsonRpcProvider }
   )
   : null;

 // TODO: infer this from fastTxExecute signature?
 type BoundFastTxExecuteFn<C extends Contract> = <F extends keyof C>(
  func: F,
  args: Parameters<C[F]>,
  options?: {
   retryCount?: number;
  }
 ) => Promise<ReturnType<C[F]>>;

 function bindFastTxExecute<C extends Contract>(
  contract: C
 ): BoundFastTxExecuteFn<C> {
  return async function (...args) {
   if (!fastTxExecutor) {
    throw new Error("no signer");
   }
   const { tx } = await fastTxExecutor.fastTxExecute(contract, ...args);
   return await tx;
  };
 }

 return {
  ...result,
  components: {
   ...result.components,
   ...clientComponents,
  },
  worldContract,
  worldSend: bindFastTxExecute(worldContract),
  fastTxExecutor,
 };

}
