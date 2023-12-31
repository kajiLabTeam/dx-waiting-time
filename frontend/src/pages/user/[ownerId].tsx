import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { NotificationErrorView } from "../../components/user/NotificationErrorView";
import { MessageCricle } from "../../components/utils/MessageCricle";
import { useFetchQueueData } from "../../hooks/useFetchQueueData";
import { useInitFirebaseNotify } from "../../hooks/useInitFirebaseNotify";
import { baseURL } from "../../utils/api";
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

const ClientPage: FC = () => {
  const [isNotification, isToken] = useInitFirebaseNotify();
  const deviceToken = localStorage.getItem("token");
  const router = useRouter();
  const { ownerId } = router.query;
  const { positionResponseState, followingResponse } = useFetchQueueData(ownerId, deviceToken);
  const [manifestLink, setManifestLink] = useState(
    `${baseURL}/${ownerId}/queue/position?deviceToken=${deviceToken}`
  );

  useEffect(() => {
    if (ownerId && deviceToken) {
      setManifestLink(`${baseURL}/${ownerId}/queue/position?deviceToken=${deviceToken}`);
    }
  }, [deviceToken]);

  if (!isNotification) {
    return <NotificationErrorView />;
  }

  return (
    <ClientPageContainer>
      <Head>
        <link rel="manifest" href={manifestLink} />
      </Head>
      <CircleContainer>
        {isToken ? (
          <MessageCricle message={positionResponseState?.callNumber} />
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
    </ClientPageContainer>
  );
};

export default ClientPage;
