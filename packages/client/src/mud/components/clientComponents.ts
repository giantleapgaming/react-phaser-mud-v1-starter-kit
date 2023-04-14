import { defineNumberComponent } from "@latticexyz/std-client";
import { world } from "../world";

export const clientComponents = {
  Counter: defineNumberComponent(world, {
    metadata: {
      id: "local.Counter",
    },
  }),
};
