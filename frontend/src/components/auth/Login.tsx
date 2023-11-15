import { User } from "firebase/auth";
import { FC, useEffect } from "react";
import styled from "styled-components";
import { useUserState } from "../../globalStates/firebaseUserState";
import { useLoginMutators } from "../../globalStates/loginState";
import { baseURL } from "../../utils/api";
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
  const user = useUserState();
  const handleLogin = async (user: User | null) => {
    try {
      await googleLogin();
      console.log("login success");
      // tokenを取得
      const token = await user?.getIdToken();
      // postする
      const response = await fetch(`${baseURL}/owner/queue/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          " Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("post success");
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

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
            onClick={() => {
              handleLogin(user);
            }}
          />
        </Action>
      </LoginPageContainer>
    </Layout>
  );
};

export default Login;
