import React , { FC } from "react";
import styled from "styled-components";
import { theme } from "./theme";

type Props = {
  message: string;
  onClick: () => void;
};

const ButtonContainer = styled.button`
  display: block;
  width: 75%;
  background-color: ${theme.colors.honey};
  border: 0.2rem solid ${theme.colors.brown};
  border-radius: 2rem;
  padding: 0.2rem 0;
`;

const Text = styled.p`
  font-size: 1.8rem;
  color: ${theme.colors.brown};
`;

export const Button: FC<Props> = ({ message , onClick }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <Text>{message}</Text>
    </ButtonContainer>
  );
};
