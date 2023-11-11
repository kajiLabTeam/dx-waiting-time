import React, { FC } from "react";
import styled from "styled-components";
import { theme } from "./theme";

type Props = {
  message: number | "appName";
};

const CircleContainer = styled.div`
  text-align: center;
  overflow-x: hidden;
  width: 120vw;
  height: 120vw;
  transform: translateX(-10vw);
  background-color: white;
  border: 0.6rem solid ${theme.colors.orenge};
  border-radius: 50%;
`;

const InCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 110vw;
  height: 110vw;
  margin: 2.5vw;
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
