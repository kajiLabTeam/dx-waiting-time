import { useRouter } from "next/router";
import { FC } from "react";
import styled from "styled-components";
import { GetOutButton } from "../../components/getout/GetOutButton";
import { FollowingResponse, PositionResponse } from "../../components/types";
import { NotificationErrorView } from "../../components/user/NotificationErrorView";
import { MessageCricle } from "../../components/utils/MessageCricle";
import { useDataWithLocalStorage } from "../../hooks/useDataWithLocalStorage";
import { useInitFirebase } from "../../hooks/useInitFirebase";
import { baseURL, useCustomSWR } from "../../utils/api";
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

const ClientPage: FC = () => {
  const [isNotification, isToken] = useInitFirebase();
  const deviceToken = localStorage.getItem("token");
  const router = useRouter();
  const { ownerId } = router.query;
  const getout = () => {};

  const { data: posionResponse, error: positionError } = useDataWithLocalStorage<PositionResponse>(
    `${baseURL}/${ownerId}/queue/position?deviceToken=${deviceToken}`
  );

  const followingURL =
    ownerId && posionResponse?.callNumber
      ? `${baseURL}/${ownerId}/queue/following?position=${posionResponse?.callNumber}`
      : null;

  const { data: followingResponse, error: followingError } =
    useCustomSWR<FollowingResponse>(followingURL);

  if (positionError || followingError) return <div>エラーが発生しました</div>;
  if (!posionResponse || !followingResponse) return <div>読み込み中...</div>;

  if (!isNotification) {
    return <NotificationErrorView />;
  }

  return (
    <ClientPageContainer>
      <CircleContainer>
        {isToken ? (
          <MessageCricle message={posionResponse.callNumber} />
        ) : (
          <MessageCricle message={""} />
        )}
        <CircleText>あなたの呼出番号は</CircleText>
      </CircleContainer>
      {isToken ? (
        <WaitingContainer>
          <Text>現在の待ち人数</Text>
          <Number>{followingResponse?.following}</Number>
        </WaitingContainer>
      ) : (
        <WaitingContainer>
          <Text>お使いのブラウザでは番号が発行できません</Text>
        </WaitingContainer>
      )}
      <ButtonContainer>
        <GetOutButton onClick={getout} />
      </ButtonContainer>
    </ClientPageContainer>
  );
};

export default ClientPage;
