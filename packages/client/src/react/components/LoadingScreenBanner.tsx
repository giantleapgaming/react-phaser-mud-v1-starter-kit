import styled from "styled-components";

export const LoadingScreenBanner = ({
  message,
  progress,
}: {
  message: string;
  progress: number;
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-neutral-900 z-101 px-6 py-2 flex flex-row items-center">
      <img src="/img/ugglogo.svg" className="w-24 h-24" />
      <div className="flex flex-row items-center gap-2 w-full">
        <LoadingBarContainer>
          <LoadingBar
            width={Math.floor(progress)}
            className="absolute bg-white"
          />
        </LoadingBarContainer>
      </div>
      <div className="w-full text-right font-source-code uppercase">
        {message}
      </div>
    </div>
  );
};

const LoadingBarContainer = styled.div`
  margin-top: 1rem;
  position: relative;
  background: none;
  height: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const LoadingBar = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  height: 16px;
`;
