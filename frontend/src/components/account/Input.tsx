import { FC } from "react";
import React from "react";
import styled from "styled-components";
import { theme } from "../../utils/theme";

type Props = {
  input: { title: string; placeholder: string };
};

const InputContainer = styled.div``;

const Input = styled.input`
  margin: 3% 0;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-family: "Noto Sans JP", sans-serif;
  background-color: ${theme.colors.cream};
  box-sizing: border-box;
  width: 100%;
  height: 3rem;
`;

const Title = styled.p`
  font-size: 2rem;
  padding: 0.3rem 0;
  color: ${theme.colors.brown};
  font-family: "Noto Sans JP", sans-serif;
  border-bottom: 2px solid ${theme.colors.brown};
`;

export const InputText: FC<Props> = ({ input }) => {
  return (
    <InputContainer>
      <Title>I {input.title}</Title>
      <Input type="text" placeholder={`${input.placeholder}を入力してください`} />
    </InputContainer>
  );
};
