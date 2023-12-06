import { FC } from "react";
import styled from "styled-components";
import { Customer } from "../../components/gragh/Customer";
import { Graph } from "../../components/gragh/Gragh";
import { Button } from "../../components/utils/Button";
import { useSalesMutators, useSalesState } from "../../globalStates/salesState";
import { theme } from "../../utils/theme";

export type CustomersData = {
  counter: number;
  data: Customer[];
};

const EndPageContainer = styled.div`
  margin-top: 10vh;
`;

const ThisDateContainer = styled.p`
  margin: 2rem 0;
  text-align: center;
  font-size: 2rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.brown};
`;

const GraphContainer = styled.div`
  margin: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5vw 0;
`;

const Text = styled.p`
  margin-top: 2rem;
  text-align: center;
  font-size: 2rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.brown};
`;

const customers: CustomersData = {
  counter: 0,
  data: [
    { time: 10, count: 20 },
    { time: 11, count: 50 },
    { time: 12, count: 80 },
    { time: 13, count: 60 },
    { time: 14, count: 10 },
    { time: 15, count: 20 },
    { time: 16, count: 40 },
    { time: 17, count: 30 },
    { time: 18, count: 60 },
    { time: 19, count: 40 },
  ],
};

const EndPage: FC = () => {
  const isSales = useSalesState();
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
      <ThisDateContainer>本日の来客数：{customers.counter}人</ThisDateContainer>
      <GraphContainer>
        <Graph customers={customers.data} />
      </GraphContainer>
      <ButtonContainer>
        <Button message={"営業終了"} onClick={onClose} />
      </ButtonContainer>
      {isSales ? "" : <Text>お疲れ様でした</Text>}
    </EndPageContainer>
  );
};

export default EndPage;
