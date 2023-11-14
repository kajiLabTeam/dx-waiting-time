import { ReactNode } from "react";
import { useRecoilState } from "recoil";
import { menuState } from "../../globalStates/menuState";
import Header from "./Header";
import Menu from "./Menu";

const Layout = ({ children }: { children: ReactNode }) => {
  const [menu] = useRecoilState(menuState);

  return (
    <div>
      <Header />
      {menu ? <Menu /> : null}
      <main
        style={
          menu
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
