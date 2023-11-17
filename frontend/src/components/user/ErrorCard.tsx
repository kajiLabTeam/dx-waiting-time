import { FC } from "react";
import styled from "styled-components";
import { theme } from "../../utils/theme";

const CardContainer = styled.div`
  background-color: ${theme.colors.cream};
  border-radius: 2rem;
  border: 0.5vh solid ${theme.colors.brown};
  padding: 2rem 1rem;
  margin: 1rem;
  transform: translateY(-55vh);
`;

const Titile = styled.p`
  text-align: center;
  font-size: 2rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.brown};
`;

const Text = styled.textarea`
  resize: none;
  margin-top: 2rem;
  width: 100%;
  height: 5rem;
  font-size: 1rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.brown};
`;

export const ErrorCard: FC = () => {
  return (
    <CardContainer>
      <Titile>現在利用できません</Titile>
      <Text
        defaultValue={
          "通知が許可されていないため列に並ぶことができません。列に並ぶには設定から通知を許可してください。"
        }
      />
      <Text defaultValue={"このサービスではお客様の呼び出し以外に通知を送ることはありません。"} />
    </CardContainer>
  );
};
