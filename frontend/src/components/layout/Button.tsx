import React from "react";
import styled from "styled-components";
import { theme } from "../../utils/theme";

type Props = {
  message: string;
};

const ButtonContainer = styled.button`
  display: block;
  width: 75%;
  background-color: ${theme.colors.honey};
  border: 0.2rem solid ${theme.colors.brown};
  border-radius: 2rem;
  padding: 0.2rem 0;
  margin: 10% auto;
`;

const Text = styled.p`
  font-size: 1.8rem;
  color: ${theme.colors.brown};
`;

const Button = ({ message }: Props) => {
  return (
    <ButtonContainer>
      <Text>{message}</Text>
    </ButtonContainer>
  );
};

export default Button;
