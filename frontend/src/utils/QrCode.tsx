import { useQRCode } from "next-qrcode";
import React, { FC } from "react";
import styled from "styled-components";
import { theme } from "./theme";

type Props = {
  url: string;
};

const QrCodeContainer = styled.div`
  text-align: center;
  padding: 1.5rem;
  background-color: ${theme.colors.cream};
  border-radius: 2rem;
  border: 0.3rem solid ${theme.colors.brown};
`;

export const QrCode: FC<Props> = ({ url }) => {
  const { Canvas } = useQRCode();

  return (
    <QrCodeContainer>
      <Canvas
        text={url}
        options={{
          type: "image/png",
          quality: 1,
          margin: 1,
          width: 300,
          color: {
            dark: theme.colors.brown,
            light: theme.colors.cream,
          },
        }}
      />
    </QrCodeContainer>
  );
};
