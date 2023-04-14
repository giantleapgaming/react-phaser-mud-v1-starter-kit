import { defineNumberComponent } from "@latticexyz/std-client";
import { world } from "../world";
import { Type, defineComponent } from "@latticexyz/recs";

export const contractComponents = {
  Counter: defineNumberComponent(world, {
    metadata: {
      contractId: "component.Counter",
    },
  }),
};

export const clientComponents = {};
