import "firebase/messaging";
import firebase from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { FC, useEffect } from "react";
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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQCD40J2m4b3i0WT9AvmzmZPpVKWaepXc",
  authDomain: "web-push-notification-practise.firebaseapp.com",
  projectId: "web-push-notification-practise",
  storageBucket: "web-push-notification-practise.appspot.com",
  messagingSenderId: "844132776020",
  appId: "1:844132776020:web:d9cbdeaef0ebb6b72555c1",
  measurementId: "G-B3513M6L7T",
};

const followingNumber = 3;
const callNumber = 321;

const ClientPage: FC = () => {
  const onLogin = () => {};

  useEffect(() => {
    const messaging = getMessaging(app);
  
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        // 通知を許可した場合
        console.log("Notification permission granted.");
        getToken(messaging).then((currentToken: string | null) => {
          if (currentToken) {
            // トークン取得成功
            console.log("currentToken:");
            console.log(currentToken);
          } else {
            // トークン取得失敗
            console.log("No Instance ID token available. Request permission to generate one.");
          }
        });
      } else {
        // 通知を拒否した場合
        console.log("Unable to get permission to notify.");
      }
    }, []);
  });
  return (
    <ClientPageContainer>
      <CircleContainer>
        <MessageCricle message={callNumber} />
        <CircleText>あなたの呼出番号は</CircleText>
      </CircleContainer>
      <Text>現在の待ち人数</Text>
      <Number>{followingNumber}人</Number>
      <ButtonContainer>
        <GetOutButton onClick={onLogin} />
      </ButtonContainer>
    </ClientPageContainer>
  );
};

export default ClientPage;
