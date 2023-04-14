import { Browser, createBrowserDevComponents } from "@latticexyz/ecs-browser";
import { ClickWrapper } from "./ClickWrapper";
import { useMUD } from "../../store/mudStore";

export const ECSBrowser = () => {
  const layers = useMUD();

  const {
    networkLayer: { world },
    devMode,
  } = layers;

  const components = createBrowserDevComponents(world);

  return (
    <>
      {devMode && (
        <ClickWrapper
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "320px",
          }}
        >
          <Browser
            world={world}
            layers={{
              phaser: layers.phaserLayer,
              network: layers.networkLayer,
            }}
            devHighlightComponent={components.devHighlightComponent}
            hoverHighlightComponent={components.hoverHighlightComponent}
          />
        </ClickWrapper>
      )}
    </>
  );
};
