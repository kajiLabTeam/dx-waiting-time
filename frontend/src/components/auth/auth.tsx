import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { useIsSigned } from "../../utils/auth";
import Login from "./Login";

type Props = {
  children: ReactNode;
};

export const Auth: FC<Props> = ({ children }) => {
  const router = useRouter();
  const isSigned = useIsSigned();
  const isEnterprisePage = router.pathname.startsWith("/enterprise");

  if (isSigned === undefined) {
    return <></>;
  }

  return isSigned || !isEnterprisePage ? <>{children}</> : <Login />;
};
