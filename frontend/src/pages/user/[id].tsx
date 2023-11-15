import { getMessaging, getToken } from "firebase/messaging";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { GetOutButton } from "../../components/getout/GetOutButton";
import { ErrorCard } from "../../components/user/ErrorCard";
import { MessageCricle } from "../../components/utils/MessageCricle";
import { app } from "../../utils/firebase";
import { theme } from "../../utils/theme";

const FalseContainer = styled.div`
  opacity: 0.3;
`;

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

const useInitFirebase = () => {
  const [isNotification, setIsNotification] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Permission not granted for Notification");
      }

      const messaging = getMessaging(app);
      let currentToken;
      try {
        currentToken = await getToken(messaging);
      } catch {
        router.reload();
      }
      if (currentToken) {
        setIsNotification(true);
      } else {
        console.error("No Instance ID token available. Request permission to generate one.");
        setIsNotification(false);
      }
    };

    requestNotificationPermission();
  }, [router]);

  return isNotification;
};

const ClientPage: FC = () => {
  const isNotification = useInitFirebase();
  const onLogin = () => {};

  if (!isNotification) {
    return (
      <>
        <FalseContainer>
          <ClientPageContainer>
            <CircleContainer>
              <MessageCricle message={""} />
              <CircleText />
            </CircleContainer>
            <WaitingContainer>
              <Number />
            </WaitingContainer>
          </ClientPageContainer>
        </FalseContainer>
        <ErrorCard />
      </>
    );
  }
  return (
    <ClientPageContainer>
      <CircleContainer>
        <MessageCricle message={callNumber} />
        <CircleText>あなたの呼出番号は</CircleText>
      </CircleContainer>
      <WaitingContainer>
        <Text>現在の待ち人数</Text>
        <Number>{followingNumber}人</Number>
      </WaitingContainer>
      <ButtonContainer>
        <GetOutButton onClick={onLogin} />
      </ButtonContainer>
    </ClientPageContainer>
  );
};

export default ClientPage;
