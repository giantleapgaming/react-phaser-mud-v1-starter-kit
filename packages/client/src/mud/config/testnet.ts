import { SetupContractConfig } from "@latticexyz/std-client";
import { getBurnerWallet } from '../../utils/getBurnerWallet'

const params = new URLSearchParams(window.location.search);

export const testnetConfig: SetupContractConfig & { faucetServiceUrl?: string } = {
 clock: {
  period: 1000,
  initialTime: 0,
  syncInterval: 5000,
 },
 provider: {
  jsonRpcUrl: params.get("rpc") ?? "https://follower.testnet-chain.linfra.xyz",
  wsRpcUrl: params.get("wsRpc") ?? "wss://follower.testnet-chain.linfra.xyz",
  chainId: Number(params.get("chainId")) || 4242,
 },
 privateKey: getBurnerWallet().privateKey,
 chainId: Number(params.get("chainId")) || 4242,
 snapshotServiceUrl: params.get("snapshot") ?? undefined,
 faucetServiceUrl: params.get("faucet") ?? undefined,
 initialBlockNumber: Number(params.get("initialBlockNumber")) || 0,
 worldAddress: params.get("worldAddress")!,
 devMode: params.get("dev") === "true",
};
