import { getMessaging, getToken } from "firebase/messaging";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { GetOutButton } from "../../components/getout/GetOutButton";
import { MessageCricle } from "../../components/utils/MessageCricle";
import { app } from "../../utils/firebase";
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

const useInitFirebase = async () => {
  const [isNotification, setIsNotification] = useState(false);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Permission not granted for Notification");
      }

      const messaging = getMessaging(app);
      const currentToken = await getToken(messaging);
      if (currentToken) {
        setIsNotification(true);
      }
      console.error("No Instance ID token available. Request permission to generate one.");
      setIsNotification(false);
    };

    requestNotificationPermission();
  }, []);

  return isNotification;
};

const ClientPage: FC = () => {
  const onLogin = () => {};
  const isNotification = useInitFirebase();
  if (!isNotification) {
    return (
      <ClientPageContainer>
        <CircleContainer>
          <MessageCricle message={""} />
          <CircleText />
        </CircleContainer>
        <WaitingContainer>
          <Text>通知をオンにしてください</Text>
          <Text>列に並ぶことができません</Text>
          <Number />
        </WaitingContainer>
      </ClientPageContainer>
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