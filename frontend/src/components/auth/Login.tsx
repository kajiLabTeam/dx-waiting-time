import { FC } from "react";
import styled from "styled-components";
import { googleLogin } from "../../utils/auth";
import Layout from "../layout/layout";
import { Button } from "../utils/Button";
import { MessageCricle } from "../utils/MessageCricle";

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

const Login: FC = () => {
  return (
    <Layout>
      <LoginPageContainer>
        <AppName>
          <MessageCricle message={"appName"} />
        </AppName>
        <Action>
          <Button
            message={"ログイン"}
            onClick={() => {
              googleLogin();
            }}
          />
        </Action>
      </LoginPageContainer>
    </Layout>
  );
};

export default Login;
