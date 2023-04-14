import { SetupContractConfig } from "@latticexyz/std-client";
import { getBurnerWallet } from '../../utils/getBurnerWallet'

const params = new URLSearchParams(window.location.search);

export const productionConfig: SetupContractConfig & { faucetServiceUrl?: string } = {
 clock: {
  period: 1000,
  initialTime: 0,
  syncInterval: 5000,
 },
 provider: {
  jsonRpcUrl: params.get("rpc") ?? "https://giantleap-test1.calderachain.xyz/http",
  wsRpcUrl: params.get("wsRpc") ?? "wss://giantleap-test1.calderachain.xyz/ws",
  chainId: Number(params.get("chainId")) || 344215,
 },
 privateKey: getBurnerWallet().privateKey,
 chainId: Number(params.get("chainId")) || 344215,
 snapshotServiceUrl: params.get("snapshot") ?? undefined,
 faucetServiceUrl: params.get("faucet") ?? undefined,
 initialBlockNumber: Number(params.get("initialBlockNumber")) || 0,
 worldAddress: params.get("worldAddress")!,
 devMode: params.get("dev") === "true",
};
