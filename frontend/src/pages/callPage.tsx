import { FC } from "react";
import styled from "styled-components";
import Circle from "../components/layout/Cricle";

const CallPageContainer = styled.div`
  text-align: center;
  overflow: hidden;
`;

const PassButton = styled.div`
  margin-top: 2rem;
`;

const EndButton = styled.div``;

const CallPage: FC = () => {
  return (
    <CallPageContainer>
      <PassButton>パス</PassButton>
      <Circle message={"Call"} />
      <EndButton>完了</EndButton>
    </CallPageContainer>
  );
};

export default CallPage;
