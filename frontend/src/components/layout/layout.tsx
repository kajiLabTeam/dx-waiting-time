import { getRedirectResult } from "firebase/auth";
import { ReactNode, useEffect } from "react";
import { useUserState } from "../../globalStates/firebaseUserState";
import { useMenuState } from "../../globalStates/menuState";
import { baseURL } from "../../utils/api";
import { auth } from "../../utils/firebase";
import Header from "./Header";
import Menu from "./Menu";

const Layout = ({ children }: { children: ReactNode }) => {
  const isMenuOpen = useMenuState();
  const user = useUserState();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // ユーザー情報は result.user に含まれています
          // ここでトークンの取得や POST リクエストなどの処理を行います
          const token = await user?.getIdToken();
          // postする
          const response = await fetch(`${baseURL}/owner/queue/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        }
      } catch (error) {
        console.error("Login failed: ", error);
      }
    };
    handleRedirectResult();
  }, []);

  return (
    <div>
      <Header />
      {isMenuOpen ? <Menu /> : null}
      <main
        style={
          isMenuOpen
            ? {
                maxWidth: "100%",
                opacity: 0.5,
                position: "absolute",
                top: "6vh",
                zIndex: 1,
                pointerEvents: "none",
              }
            : { opacity: 1 }
        }
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
