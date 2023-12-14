import { getMessaging, getToken } from "firebase/messaging";
import { FC, useState } from "react";
import styled from "styled-components";
import { MessageCricle } from "../../components/utils/MessageCricle";
import { app } from "../../utils/firebase";
import { theme } from "../../utils/theme";
import { ErrorCard } from "./ErrorCard";

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

const Number = styled.p`
  margin-bottom: 2rem;
  font-size: 4rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.red};
`;

const ButtonContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 100;
`;

const requestNotificationPermission = async () => {
  Notification.requestPermission().then((permission) => {
    if (permission !== "granted") {
      console.error("Permission not granted for Notification");
      return;
    }
  });
  const messaging = getMessaging(app);
  getToken(messaging, {
    vapidKey:
      "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",
  })
    .then((currentToken) => {
      console.log(currentToken);
    })
    .catch((err) => {
      console.error("An error occurred while retrieving token. ", err);
    });
};

export const NotificationErrorView: FC = () => {
  const [isOpenPage, setIsOpenPage] = useState(false);
  const setTrue = () => () => {
    if (isOpenPage) return;
    setIsOpenPage(true);
    requestNotificationPermission();
  };

  return (
    <ButtonContainer onClick={setTrue()}>
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
    </ButtonContainer>
  );
};
