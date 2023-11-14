import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { menuState } from "../../globalStates/menuState";
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

const menus = [
  {
    name: ["アカウント情報", "QRコード印刷", "呼び出し", "業務を始める", "業務を終わる"],
    url: ["accountPage", "qrPage", "callPage", "startPage", "endPage"],
  },
];

const Margin = styled.div`
  height: 60vh;
`;

const Menu = () => {
  const router = useRouter();
  const pathParts = router.pathname.split("/");
  const [, , pageName] = pathParts;

  const [menu, setMenu] = useRecoilState(menuState);

  const onHideMenu = () => {
    setMenu(!menu);
  };

  // routerと同じ名前のmenusを消す
  const filteredMenus = menus.map((menu) => ({
    name: menu.name.filter((_, index) => menu.url[index] !== pageName),
    url: menu.url.filter((url) => url !== pageName),
  }));

  return (
    <MenuContainer>
      {filteredMenus[0].name.map((value, index) => (
        <Link
          href={link + filteredMenus[0].url[index]}
          key={index}
          style={{ textDecoration: "none" }}
        >
          <MenuList>{value}</MenuList>
        </Link>
      ))}
      <Margin onClick={onHideMenu} />
    </MenuContainer>
  );
};

export default Menu;
