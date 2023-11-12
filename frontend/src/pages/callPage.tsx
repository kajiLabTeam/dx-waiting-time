import { FC } from "react";
import { useState } from "react";
import styled from "styled-components";
import { CallCircle } from "../components/call/CallCricle";
import { EndButton } from "../components/call/EndButton";
import { MessageCricle } from "../components/utils/MessageCricle";
import { PassButton } from "../components/call/PassButton";
import { theme } from "../utils/theme";

const CallPageContainer = styled.div`
  text-align: center;
  overflow: hidden;
`;

const PassButtonContainer = styled.div`
  margin-bottom: 1vh;
`;

const CallCircleContainer = styled.div``;

const FollowingContainer = styled.div`
  margin-top: 1vh;
  font-size: 2rem;
  height: 4.8vh;
  color: ${theme.colors.red};
  @media screen and (max-height: 700px) {
    margin-top: 0.9vh;
    font-size: 1.5rem;
  }
`;

const EndButtonContainer = styled.div`
  position: sticky;
`;

const following = 123;
const callNumber = 321;

const CallPage: FC = () => {
  const [calling, setCalling] = useState(false);
  const onWaiting = () => {
    setCalling(false);
  };
  const onCalling = () => {
    setCalling(true);
  };
  if (calling) {
    return (
      <CallPageContainer>
        <PassButtonContainer>
          <PassButton $calling={calling} onClick={onWaiting} />
        </PassButtonContainer>
        <CallCircleContainer>
          <MessageCricle message={callNumber} />
        </CallCircleContainer>
        <FollowingContainer>{following} 人待ち</FollowingContainer>
        <EndButtonContainer>
          <EndButton $calling={calling} onClick={onWaiting} />
        </EndButtonContainer>
      </CallPageContainer>
    );
  }
  return (
    <CallPageContainer>
      <PassButtonContainer>
        <PassButton $calling={calling} onClick={onWaiting} />
      </PassButtonContainer>
      <CallCircleContainer>
        <CallCircle onClick={onCalling} />
      </CallCircleContainer>
      <FollowingContainer>{following} 人待ち</FollowingContainer>
      <EndButtonContainer>
        <EndButton $calling={calling} onClick={onWaiting} />
      </EndButtonContainer>
    </CallPageContainer>
  );
};

export default CallPage;
