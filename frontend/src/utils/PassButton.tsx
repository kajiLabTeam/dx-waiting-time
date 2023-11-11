import React from "react";
import styled from "styled-components";
import { theme } from "./theme";

type Props = {
  calling: boolean;
  onClick: () => void;
};

const PassButtonContainer = styled.button<Props>`
  background-color: ${(props) => (props.calling ? theme.colors.honey : theme.colors.cream)};
  width: 104vw;
  transform: translateX(-2vw);
  height: 12vh;
  border-radius: 0 0 2rem 2rem;
  border-right: 0.8vh solid ${(props) => (props.calling ? theme.colors.brown : theme.colors.orenge)};
  border-left: 0.8vh solid ${(props) => (props.calling ? theme.colors.brown : theme.colors.orenge)};
  border-bottom: 0.8vh solid
    ${(props) => (props.calling ? theme.colors.brown : theme.colors.orenge)};
`;

const Text = styled.p`
  font-size: 2.4rem;
  color: ${theme.colors.brown};
`;

export const PassButton = ({ calling, onClick }: Props) => {
  return (
    <PassButtonContainer calling={calling} onClick={onClick}>
      <Text>パス</Text>
    </PassButtonContainer>
  );
};
