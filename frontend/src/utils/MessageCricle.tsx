import React, { FC } from "react";
import styled from "styled-components";
import { theme } from "./theme";

type Props = {
  message: number | "appName";
};

const CircleContainer = styled.div`
  text-align: center;
  overflow-x: hidden;
  width: 60vh;
  height: 60vh;
  transform: translateX(-7vh);
  background-color: white;
  border: 1vh solid ${theme.colors.orenge};
  border-radius: 60vh;
  @media screen and (max-height: 700px) {
    transform: translateX(-2vh);
  }
`;

const InCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 55vh;
  height: 55vh;
  margin: 1.45vh;
  background-color: ${theme.colors.cream};
  border-radius: 50%;
`;

const Number = styled.p`
  font-size: 12rem;
  color: ${theme.colors.brown};
`;

const Text = styled.p`
  font-size: 6rem;
  color: ${theme.colors.brown};
`;

export const MessageCricle: FC<Props> = ({ message }) => {
  return (
    <CircleContainer>
      <InCircle>
        {typeof message === "number" ? <Number>{message}</Number> : <Text>簡単行列整理くん</Text>}
      </InCircle>
    </CircleContainer>
  );
};
