import { User } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Customer } from "../../components/gragh/Customer";
import { Graph } from "../../components/gragh/Gragh";
import { Button } from "../../components/utils/Button";
import { useUserState } from "../../globalStates/firebaseUserState";
import { useSalesMutators, useSalesState } from "../../globalStates/salesState";
import { baseURL } from "../../utils/api";
import { theme } from "../../utils/theme";

export type CustomersData = {
  counter: number;
  result: Customer[];
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

const getResults = async (user:User | null) => {
  const idToken = await user?.getIdToken();
  try {
    const response = await fetch(`${baseURL}/owner/queue/result`, {
      headers: {
        authorization: `Bearer ${idToken}`,
      },
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

const EndPage: FC = () => {
  const [customers, setCustomers] = useState<CustomersData | undefined>();
  const isSales = useSalesState();
  const user = useUserState();
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

  // ページが開かれた時に、リザルトを取得する
  useEffect(() => {
    const fetchResults = async () => {
      const result = await getResults(user);
      setCustomers(result);
    };

    fetchResults();
  },[user]);

  return (
    <EndPageContainer>
      <ThisDateContainer>
        {thisMonth}月{thisDay}日({thisWeek})
      </ThisDateContainer>
      {customers && <ThisDateContainer>本日の来客数：{customers.counter}人</ThisDateContainer>}
      <GraphContainer>
      {customers && <Graph customers={customers.result} />}
      </GraphContainer>
      <ButtonContainer>
        <Button message={"営業終了"} onClick={onClose} />
      </ButtonContainer>
      {isSales ? "" : <Text>お疲れ様でした</Text>}
    </EndPageContainer>
  );
};

export default EndPage;
