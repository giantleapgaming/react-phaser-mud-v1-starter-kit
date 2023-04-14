import { useEffect, useState } from "react";
import { LoadingScreenBanner } from "../components/LoadingScreenBanner";
import styled from "styled-components";
import { useMUD } from "../hooks";
import { GodID, SyncState } from "@latticexyz/network";
import { getComponentValue } from "@latticexyz/recs";

export const BootScreen = () => {
  const [opacity, setOpacity] = useState(0);
  const {
    networkLayer: {
      world,
      components: { LoadingState },
    },
  } = useMUD();
  const GodEntityIndex = world.entityToIndex.get(GodID);

  const loadingState =
    GodEntityIndex == null
      ? null
      : getComponentValue(LoadingState, GodEntityIndex);

  useEffect(() => setOpacity(1), []);

  if (loadingState == null) {
    return (
      <Container style={{ opacity }}>
        <img src="/img/loadingScreen.png" className="object-cover"></img>
        <div>
          <LoadingScreenBanner message={"Connecting..."} progress={0} />
        </div>
      </Container>
    );
  }
  if (loadingState.state !== SyncState.LIVE) {
    return (
      <Container style={{ opacity }}>
        <div>
          <img src="/img/loadingScreen.png" className="object-cover"></img>
          <LoadingScreenBanner
            message={loadingState.msg}
            progress={loadingState.percentage}
          />
        </div>
      </Container>
    );
  }
  return null;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 100%);
  color: #fff;
  display: grid;
  position: relative;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  z-index: 100;
  pointer-events: all;
  transition: all 2s ease-in-out;
`;
