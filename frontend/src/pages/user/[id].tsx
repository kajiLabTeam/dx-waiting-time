import { FC } from "react";
import styled from "styled-components";
import { GetOutButton } from "../../components/getout/GetOutButton";
import { PositionResponse } from "../../components/types";
import { NotificationErrorView } from "../../components/user/NotificationErrorView";
import { MessageCricle } from "../../components/utils/MessageCricle";
import { useInitFirebase } from "../../hooks/useInitFirebase";
import { useCustomSWR } from "../../utils/api";
import { theme } from "../../utils/theme";

const ClientPageContainer = styled.div`
  text-align: center;
  overflow: hidden;
`;

const CircleContainer = styled.div`
  margin-top: 2rem;
`;

const CircleText = styled.div`
  font-size: 1.8rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.brown};
  transform: translateY(-48vh);
  height: inherit;
  max-height: 0;
`;

const WaitingContainer = styled.div``;

const Text = styled.p`
  margin-top: 1rem;
  font-size: 2rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.brown};
`;

const Number = styled.p`
  margin-bottom: 2rem;
  font-size: 4rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.red};
`;

const ButtonContainer = styled.div`
  display: block;
  width: 100%;
`;

const followingNumber = 3;
const callNumber = 321;

const ClientPage: FC = () => {
  const [isNotification, isToken] = useInitFirebase();
  const getout = () => {};

  const { data: posionResponse, error } = useCustomSWR<PositionResponse>(
    "http://localhost:3000/api/position"
  );

  if (!isNotification) {
    return <NotificationErrorView />;
  }

  return (
    <ClientPageContainer>
      <CircleContainer>
        {isToken ? <MessageCricle message={callNumber} /> : <MessageCricle message={""} />}
        <CircleText>あなたの呼出番号は</CircleText>
      </CircleContainer>
      {isToken ? (
        <WaitingContainer>
          <Text>現在の待ち人数</Text>
          <Number>{followingNumber}人</Number>
        </WaitingContainer>
      ) : (
        <WaitingContainer>
          <Text>番号が発行されません</Text>
        </WaitingContainer>
      )}
      <ButtonContainer>
        <GetOutButton onClick={getout} />
      </ButtonContainer>
    </ClientPageContainer>
  );
};

export default ClientPage;
