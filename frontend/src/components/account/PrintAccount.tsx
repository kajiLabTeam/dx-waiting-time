import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../utils/theme";

type Props = {
  input: { title: string; placeholder: string };
};

const PrintContainer = styled.div``;

const Title = styled.p`
opacity: 0.7;
  font-size: 2rem;
  margin: 3% 0;
  padding: 0.3rem 0.3rem;
  color: ${theme.colors.brown};
  font-family: "Noto Sans JP", sans-serif;
  border-bottom: 2px solid ${theme.colors.brown};
`;

const Text = styled.p`
  display: inline-block;
  padding: 0.5rem;
  color: ${theme.colors.brown};
  font-size: 1.5rem;
  font-family: "Noto Sans JP", sans-serif;
  box-sizing: border-box;
  width: 100%;
  height: 3rem;
`;

export const PrintAccount: FC<Props> = ({ input }) => {
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    setInputText(inputText);
  }, [inputText]);

  return (
    <PrintContainer>
      <Title>I {input.title}</Title>
      <Text>{input.placeholder}</Text>
    </PrintContainer>
  );
};
