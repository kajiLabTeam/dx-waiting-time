import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useAccountMutators } from "../../globalStates/accountState";
import { theme } from "../../utils/theme";

type Props = {
  input: { title: string; text: string };
};

const EditContainer = styled.div``;

const Input = styled.input`
  display: inline-block;
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
  margin: 3% 0;
  padding: 0.3rem 0.3rem;
  color: ${theme.colors.brown};
  font-family: "Noto Sans JP", sans-serif;
  border-bottom: 2px solid ${theme.colors.brown};
`;

const InText = styled.div`
  display: flex;
  align-items: center;
`;

export const EditAccount: FC<Props> = ({ input }) => {
  const { setAccountInfo } = useAccountMutators();
  // 状態変数とその更新関数を作成
  const [text, setText] = useState<string | null>(null);

  // 入力フィールドのonChangeイベントハンドラ
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    if (text === null) return;
    setAccountInfo(input.title, text);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, input.title]);

  return (
    <EditContainer>
      <Title>I {input.title}</Title>
      <InText>
        <Input type="text" placeholder={input.text} onChange={handleInputChange} />
      </InText>
    </EditContainer>
  );
};
