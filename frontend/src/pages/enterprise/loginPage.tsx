import { FC } from "react";
import styled from "styled-components";
import { Button } from "../../components/utils/Button";
import { MessageCricle } from "../../components/utils/MessageCricle";

const LoginPageContainer = styled.div`
  text-align: center;
  overflow: hidden;
`;

const AppName = styled.div`
  margin-top: 2rem;
`;

const Action = styled.div`
  display: flex;
  justify-content: center;
  text-decoration: none;
  margin-top: 4rem;
`;

const LoginPage: FC = () => {
  const onLogin = () => {};
  return (
    <LoginPageContainer>
      <AppName>
        <MessageCricle message={"appName"} />
      </AppName>
      <Action>
        <Button message={"ログイン"} onClick={onLogin} />
      </Action>
    </LoginPageContainer>
  );
};

export default LoginPage;
