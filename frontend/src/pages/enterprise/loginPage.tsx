import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/utils/Button";
import { MessageCricle } from "../../components/utils/MessageCricle";
import { googleLogin, useIsSigned } from "../../utils/auth";

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
  const router = useRouter();
  const isLogin = useIsSigned();

  if (isLogin === undefined) return <></>;
  if (isLogin) router.push("/enterprise/startPage");

  return (
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
  );
};

export default LoginPage;
