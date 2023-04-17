import { useStore } from "../store/mudStore";
import { BootScreen } from "./Screens/BootScreen";
import { Wrapper } from "./components";

export const ReactLayer = () => {
  const layers = useStore((state) => {
    return {
      networkLayer: state.networkLayer,
      phaserLayer: state.phaserLayer,
    };
  });
  if (!layers.networkLayer || !layers.phaserLayer) return <></>;

  return (
    <Wrapper>
      <BootScreen />
    </Wrapper>
  );
};
