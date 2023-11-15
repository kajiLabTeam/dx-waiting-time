import { getMessaging, getToken } from "firebase/messaging";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { GetOutButton } from "../../components/getout/GetOutButton";
import { NotificationErrorView } from "../../components/user/NotificationErrorView";
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

const useInitFirebase = () => {
  const [isNotification, setIsNotification] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const requestNotificationPermission = async () => {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.error("Permission not granted for Notification");
          setIsNotification(false);
          return;
        }
      });
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",
      })
        .then((currentToken) => {
          if (currentToken) {
            localStorage.setItem("token", currentToken);
            setIsNotification(true);
            setIsToken(true);
          } else {
            console.error("No registration token available. Request permission to generate one.");
            setIsToken(false);
          }
        })
        .catch((err) => {
          console.error("An error occurred while retrieving token. ", err);
          setIsToken(false);
          router.reload();
        });
    };
    requestNotificationPermission();
  }, [router]);

  return [isNotification, isToken];
};

const ClientPage: FC = () => {
  const [isNotification, isToken] = useInitFirebase();
  const getout = () => {};

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
