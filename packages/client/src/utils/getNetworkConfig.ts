import { localhostConfig, productionConfig, testnetConfig } from '../mud'

export function getNetworkConfig() {
 const params = new URLSearchParams(window.location.search);
 if (params.get("dev") === "true") {
  return localhostConfig
 }
 if (params.get("dev") === "test") {
  return testnetConfig
 }
 return productionConfig

}
