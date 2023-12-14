import { FC } from "react";
import styled from "styled-components";
import { MessageCricle } from "../../components/utils/MessageCricle";
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

export const NotificationErrorView: FC = () => {
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
};
