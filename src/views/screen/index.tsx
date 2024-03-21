import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";

export const ScreenView = () => {
  useDocumentTitle("效能大屏", false);

  return (
    <Frame
      title="screen"
      src="https://10.190.125.234:9530/autoplay?token=xxxx"
    ></Frame>
  );
};

export const Frame = styled.iframe`
  width: 100%;
  heigth: 10rem;
  display: flex;
  flex-direction: column;
`;
