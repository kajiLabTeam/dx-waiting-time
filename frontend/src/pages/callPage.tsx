import { FC } from "react";
import styled from "styled-components";
import { CallCircle } from "../utils/CallCricle";

const CallPageContainer = styled.div`
  text-align: center;
  overflow: hidden;
`;

const PassButton = styled.div`
  margin-top: 2rem;
`;

const EndButton = styled.div``;

const CallPage: FC = () => {
  const onCalling = () => {};
  return (
    <CallPageContainer>
      <PassButton>パス</PassButton>
      <CallCircle onClick={onCalling} />
      <EndButton>完了</EndButton>
    </CallPageContainer>
  );
};

export default CallPage;
