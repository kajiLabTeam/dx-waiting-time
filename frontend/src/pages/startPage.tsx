import { FC } from "react";
import styled from "styled-components";
import { Button } from "../utils/Button";
import { MessageCricle } from "../utils/MessageCricle";
import { theme } from "../utils/theme";

const StartPageContainer = styled.div`
  text-align: center;
  overflow: hidden;
`;

const MessageCricleContainer = styled.div`
  margin: 2rem 0;
`;

const ThisDateContainer = styled.p`
  font-size: 2rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.brown};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const StartPage: FC = () => {
  const onStart = () => {};

  // 今日の日付を取得
  const thisDate = new Date();
  const thisMonth = thisDate.getMonth() + 1;
  const thisDay = thisDate.getDate();
  const thisDayOfWeek = thisDate.getDay();
  const week = ["日", "月", "火", "水", "木", "金", "土"];
  const thisWeek = week[thisDayOfWeek];

  return (
    <StartPageContainer>
      <MessageCricleContainer>
        <MessageCricle message={"appName"} />
      </MessageCricleContainer>
      <ThisDateContainer>
      {thisMonth}月{thisDay}日({thisWeek})
      </ThisDateContainer>
      <ButtonContainer>
        <Button message={"営業開始"} onClick={onStart} />
      </ButtonContainer>
    </StartPageContainer>
  );
};

export default StartPage;
