import { FC } from "react";
import styled from "styled-components";
import Button from "../components/layout/Button";
import Cricle from "../components/layout/Cricle";

const StartPageContainer = styled.div`
  text-align: center;
  overflow: hidden;
`;

const StartPage: FC = () => {
  const onStart = () => {};
  return (
    <StartPageContainer>
      <div>start page</div>
      <Cricle message={"appName"} />
      <div>日付</div>
      <Button message={"営業開始"} onClick={onStart}/>
    </StartPageContainer>
  );
};

export default StartPage;
