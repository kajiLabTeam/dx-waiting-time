import { FC, useEffect } from "react";
import styled from "styled-components";
import { useLoginMutators } from "../../globalStates/loginState";
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
  const { setLoginOpenState } = useLoginMutators();
  useEffect(() => {
    setLoginOpenState(true);
  }, [setLoginOpenState]);

  return (
    <Layout>
      <LoginPageContainer>
        <AppName>
          <MessageCricle message={"appName"} />
        </AppName>
        <Action>
          <Button
            message={"ログイン"}
            onClick={async () => {
              await googleLogin();
            }}
          />
        </Action>
      </LoginPageContainer>
    </Layout>
  );
};

export default Login;
