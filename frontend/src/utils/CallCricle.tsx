import React, { FC } from "react";
import { FaBell } from "react-icons/fa";
import styled from "styled-components";
import { theme } from "./theme";

type Props = {
  onClick: () => void;
};

const CircleContainer = styled.div`
  text-align: center;
  overflow-x: hidden;
  width: 60vh;
  height: 60vh;
  transform: translateX(-7vh);
  background-color: ${theme.colors.cream};
  border: 1vh solid ${theme.colors.brown};
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
  background-color: ${theme.colors.honey};
  border-radius: 50%;
`;

const Bell = styled.div`
  display: block;
  font-size: 20rem;
  line-height: 0;
  transform: translateY(0rem);
  color: ${theme.colors.brown};
  @media screen and (max-height: 700px) {
    font-size: 14rem;
  }
`;

const BellText = styled.p`
  display: block;
  font-size: 3rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.brown};
  margin-top: 0.5rem;
  @media screen and (max-height: 700px) {
    margin-top: 1rem;
    font-size: 2.5rem;
  }
`;

export const CallCircle: FC<Props> = ({ onClick }) => {
  return (
    <CircleContainer onClick={onClick}>
      <InCircle>
        <Bell>
          <FaBell />
        </Bell>
        <BellText>呼び出し</BellText>
      </InCircle>
    </CircleContainer>
  );
};
