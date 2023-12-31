import { useRouter } from "next/router";
import { FC } from "react";
import styled from "styled-components";
import { useNotiMutators } from "../../globalStates/isNotiState";
import { theme } from "../../utils/theme";
import { Button } from "../utils/Button";

const CardContainer = styled.div`
  background-color: ${theme.colors.cream};
  border-radius: 2rem;
  border: 0.5vh solid ${theme.colors.brown};
  padding: 2rem 1rem;
  margin: 1rem;
  transform: translateY(-65vh);
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

const IPhoneText = styled.textarea`
  resize: none;
  margin-top: 2rem;
  width: 100%;
  height: 5rem;
  font-size: 1.2rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.brown};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  word-break: auto-phrase;
`;

export const ErrorCard: FC = () => {
  const { setNotiPermissionState } = useNotiMutators();
  const router = useRouter();

  const onInitFirebase = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setNotiPermissionState(true);
        router.reload();
      }
    });
  };
  return (
    <CardContainer>
      <Titile>現在利用できません</Titile>
      <Text
        readOnly
        defaultValue={
          "通知が許可されていないため列に並ぶことができません。列に並ぶには設定から通知を許可してください。"
        }
      />
      <Text
        readOnly
        defaultValue={"このサービスではお客様の呼び出し以外に通知を送ることはありません。"}
      />
      <hr />
      <IPhoneText readOnly defaultValue={"iPhoneの方は下のボタンより通知を許可してください"} />
      <ButtonContainer>
        <Button message={"通知を許可"} onClick={onInitFirebase} />
      </ButtonContainer>
    </CardContainer>
  );
};
