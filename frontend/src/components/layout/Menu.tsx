import Link from "next/link";
import styled from "styled-components";
import { useMenuMutators, useMenuState } from "../../globalStates/menuState";
import { useSalesState } from "../../globalStates/salesState";
import { usePageName } from "../../hooks/usePageName";
import { theme } from "../../utils/theme";

const MenuContainer = styled.div`
  text-decoration: none;
  position: sticky;
  z-index: 3;
`;

const MenuList = styled.div`
  padding: 0.4rem 0.8rem;
  font-size: 1.6rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.brown};
  border: 1px solid ${theme.colors.cream};
  background-color: ${theme.colors.honey};
`;

const link = "/enterprise/";

const menus = {
  name: ["アカウント情報", "QRコード印刷", "呼び出し", "業務を始める", "業務を終わる"],
  url: ["accountPage", "qrPage", "callPage", "startPage", "endPage"],
} as const;

const Margin = styled.div`
  height: 60vh;
`;

const Menu = () => {
  const [, pageName] = usePageName();
  const isMenuOpen = useMenuState();
  const { setMenuOpenState } = useMenuMutators();
  const isSales = useSalesState();

  const onHideMenu = () => {
    setMenuOpenState(!isMenuOpen);
  };

  // routerと同じ名前のmenusを消す
  let filteredMenus = {
    name: menus.name.filter((_, index) => menus.url[index] !== pageName),
    url: menus.url.filter((url) => url !== pageName),
  };

  // isSalesがtrueの時はstartPageを消す、isSalesがfalesの時はendPageを消す
  if (isSales) {
    filteredMenus.name = filteredMenus.name.filter(
      (_, index) => filteredMenus.url[index] !== "startPage"
    );
    filteredMenus.url = filteredMenus.url.filter((url) => url !== "startPage");
  } else {
    filteredMenus.name = filteredMenus.name.filter(
      (_, index) => filteredMenus.url[index] !== "endPage"
    );
    filteredMenus.url = filteredMenus.url.filter((url) => url !== "endPage");
  }

  return (
    <MenuContainer>
      {filteredMenus.name.map((value, index) => (
        <Link href={link + filteredMenus.url[index]} key={index} style={{ textDecoration: "none" }}>
          <MenuList>{value}</MenuList>
        </Link>
      ))}
      <Margin onClick={onHideMenu} />
    </MenuContainer>
  );
};

export default Menu;
