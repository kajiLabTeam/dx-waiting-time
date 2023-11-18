import { useRouter } from "next/router";
import styled from "styled-components";
import { Button } from "../components/utils/Button";
import { MessageCricle } from "../components/utils/MessageCricle";

const HomePageContainer = styled.div`
  text-align: center;
  overflow: hidden;
`;

const MessageCricleContainer = styled.div`
  margin: 2rem 0;
`;

const Action = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  margin-top: 4rem;
  align-items: center;
`;

export default function Home() {
  const router = useRouter();
  //ローカルストレージのowner_idを持ってくる
  const localOwnerId = JSON.parse(localStorage.getItem("dxWaitingTime") || "{}").ownerId;

  return (
    <div>
      <HomePageContainer>
        <MessageCricleContainer>
          <MessageCricle message={"appName"} />
        </MessageCricleContainer>
        <Action>
          <Button message="利用者ページへ" onClick={() => router.push(`/user/${localOwnerId}`)} />
          <Button message="事業者ページへ" onClick={() => router.push(`/enterprise/startPage`)} />
        </Action>
      </HomePageContainer>
    </div>
  );
}
