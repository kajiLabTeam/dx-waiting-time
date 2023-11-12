import React, { FC } from "react";
import styled from "styled-components";
import { theme } from "../../utils/theme";

type Props = {
  onClick: () => void;
};

const ButtonContainer = styled.div`
  display: block;
  width: 70%;
  background-color: #dddddd;
  border-radius: 1rem;
  padding: 0.2rem 0;
  margin: 0 15%;
`;

const Text = styled.p`
  font-size: 1.8rem;
  color: ${theme.colors.brown};
`;

export const GetOutButton: FC<Props> = ({ onClick }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <Text>列から抜ける</Text>
    </ButtonContainer>
  );
};
