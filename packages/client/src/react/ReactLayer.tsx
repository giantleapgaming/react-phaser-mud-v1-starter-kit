import { useStore } from "../store/mudStore";
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
      <p>Hellow</p>
    </Wrapper>
  );
};
