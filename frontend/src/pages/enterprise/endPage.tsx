import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";
import { Button } from "../../components/utils/Button";
import { useSalesMutators } from "../../globalStates/salesState";
import { theme } from "../../utils/theme";

const EndPageContainer = styled.div`
  margin-top: 30vh;
`;

const ThisDateContainer = styled.p`
  margin: 2rem 0;
  text-align: center;
  font-size: 2rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.brown};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px;
`;

const EndPage: FC = () => {
  const { setSales } = useSalesMutators();
  const onClose = () => {
    setSales(false);
  };
  // 今日の日付を取得
  const thisDate = new Date();
  const thisMonth = thisDate.getMonth() + 1;
  const thisDay = thisDate.getDate();
  const thisDayOfWeek = thisDate.getDay();
  const week = ["日", "月", "火", "水", "木", "金", "土"];
  const thisWeek = week[thisDayOfWeek];
  return (
    <EndPageContainer>
      <ThisDateContainer>
        {thisMonth}月{thisDay}日({thisWeek})
      </ThisDateContainer>
      <Link href={"callPage"} style={{textDecoration: "none"}}>
      <ButtonContainer>
        <Button message={"営業終了"} onClick={onClose} />
      </ButtonContainer>
      </Link>
    </EndPageContainer>
  );
};

export default EndPage;
