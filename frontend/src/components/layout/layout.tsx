import { ReactNode } from "react";
import { useMenuState } from "../../globalStates/menuState";
import Header from "./Header";
import Menu from "./Menu";

const Layout = ({ children }: { children: ReactNode }) => {
  const isMenuOpen = useMenuState();

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
