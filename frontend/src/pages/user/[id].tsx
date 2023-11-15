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
  const [isToken, setIsToken] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.error("Permission not granted for Notification");
        setIsNotification(false);
        return;
      }
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",
      })
        .then((currentToken) => {
          if (currentToken) {
            localStorage.setItem("token", currentToken);
            setIsToken(true);
          } else {
            console.error("No registration token available. Request permission to generate one.");
            setIsNotification(false);
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
        <GetOutButton onClick={onLogin} />
      </ButtonContainer>
    </ClientPageContainer>
  );
};

export default ClientPage;
