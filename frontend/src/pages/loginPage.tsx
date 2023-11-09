import { FC } from "react";
import styled from "styled-components";
import Button from "../components/layout/Button";
import Cricle from "../components/layout/Cricle";

const LoginPageContainer = styled.div`
  text-align: center;
  overflow: hidden;
`;

const AppName = styled.div`
  margin-top: 2rem;
`;

const Action = styled.div``;

const LoginPage: FC = () => {
  const onLogin = () => {};
  return (
    <LoginPageContainer>
      <AppName>
        <Cricle message={"appName"} />
      </AppName>
      <Action>
        <Button message={"ログイン"} onClick={onLogin} />
      </Action>
    </LoginPageContainer>
  );
};

export default LoginPage;
