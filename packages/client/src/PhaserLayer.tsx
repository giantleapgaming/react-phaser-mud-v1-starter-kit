import { useEffect } from "react";
import { NetworkLayer } from "./network";
import { usePhaserLayer } from "./react/hooks/usePhaserLayer";
import { useStore } from "./store/mudStore";

type Props = {
  networkLayer: NetworkLayer | null;
};

export const PhaserLayer = ({ networkLayer }: Props) => {
  const { ref: phaserRef, phaserLayer } = usePhaserLayer({ networkLayer });

  useEffect(() => {
    if (phaserLayer) {
      useStore.setState({ phaserLayer });
    }
  }, [phaserLayer]);

  return (
    <div
      ref={phaserRef}
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
      }}
    />
  );
};
