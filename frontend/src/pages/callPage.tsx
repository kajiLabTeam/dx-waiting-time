import { FC } from "react";
import { useState } from "react";
import styled from "styled-components";
import { CallCircle } from "../utils/CallCricle";
import { EndButton } from "../utils/EndButton";
import { PassButton } from "../utils/PassButton";

const CallPageContainer = styled.div`
    text-align: center;
    overflow: hidden;
`;

const PassButtonContainer = styled.div`
    margin-bottom: 0.5rem;
`;

const CallCircleContainer = styled.div``;

const FollowingContainer = styled.div`
  margin-top: 0.5rem;
  font-size: 2rem;
`;

const EndButtonContainer = styled.div`
    margin-top: 0.5rem;
    position: sticky;
`;

const following = 123;

const CallPage: FC = () => {
    const [calling, setCalling] = useState(false);
    const onWaiting = () => {
        setCalling(false);
    };
    const onCalling = () => {
        setCalling(true);
    };
    return (
        <CallPageContainer>
            <PassButtonContainer>
                <PassButton calling={calling} onClick={onWaiting} />
            </PassButtonContainer>
            <CallCircleContainer>
                <CallCircle calling={calling} onClick={onCalling} />
            </CallCircleContainer>
            <FollowingContainer>
              {following} 人待ち
            </FollowingContainer>
            <EndButtonContainer>
                <EndButton calling={calling} onClick={onWaiting} />
            </EndButtonContainer>
        </CallPageContainer>
    );
};

export default CallPage;
