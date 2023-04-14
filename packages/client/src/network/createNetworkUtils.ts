import {
  EntityID,
  EntityIndex,
  defineSystem,
  Has,
  getComponentValue,
  UpdateType,
} from "@latticexyz/recs";
import { NetworkLayer } from "./createNetworkLayer";

export function createNetworkUtils(layer: Omit<NetworkLayer, "utils">) {
  /**
   * @param callback Called once a Player and all of their Components are loaded into the game.
   */
  function onPlayerLoaded(
    callback: (data: { player: EntityIndex; playerId: EntityID; playerNumber: number; } | null) => void
  ) {
    const {
      world,
      components: { Counter },
      playerEntity,
      playerEntityId
    } = layer;

    let playerLoaded = false;

    defineSystem(world, [Has(Counter)], ({ type, entity }) => {
      if (playerLoaded) return;
      if (entity !== playerEntity) return;
      if (!playerEntity || !playerEntityId) return;

      if (type === UpdateType.Exit) {
        playerLoaded = false;
        callback(null)
        return;
      }

      const playerNumber = getComponentValue(Counter, playerEntity);
      if (!playerNumber) return;

      playerLoaded = true;
      callback({
        player: playerEntity,
        playerId: playerEntityId,
        playerNumber: playerNumber.value,
      });
    });
  }

  return {
    onPlayerLoaded,
    txApi: {},
  };
}
