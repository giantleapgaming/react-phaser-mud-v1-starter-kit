import { useEffect } from "react";
import { useNetworkLayer } from "./react/hooks";
import { useStore } from "./store/mudStore";
import { PhaserLayer } from "./PhaserLayer";
import { ReactLayer } from "./react/ReactLayer";
import { Toaster } from "sonner";
export const App = () => {
  const networkLayer = useNetworkLayer();

  useEffect(() => {
    if (networkLayer) {
      useStore.setState({ networkLayer });
    }
  }, [networkLayer]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <PhaserLayer networkLayer={networkLayer} />
      <Toaster />
      <ReactLayer />
    </div>
  );
};
