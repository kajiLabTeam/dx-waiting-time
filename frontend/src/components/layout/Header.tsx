import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { menuState } from "../../globalStates/menuState";
import { useIsSigned } from "../../utils/auth";
import { theme } from "../../utils/theme";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.orenge};
  align-items: center;
  height: 6vh;
`;

const Title = styled.h2`
  margin-left: 1rem;
  color: ${theme.colors.brown};
`;

const MenuButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #602e1b;
  font-size: 2.5rem;
  margin-right: 0.5rem;
`;

const Text = styled.span`
  font-family: "Noto Sans JP", sans-serif;
`;

const Header = () => {
  const router = useRouter();
  const pathParts = router.pathname.split("/");
  const [, role, pageName] = pathParts;
  const isSigned = useIsSigned();

  const [menu, setMenu] = useRecoilState(menuState);

  const onHideMenu = () => {
    setMenu(!menu);
  };

  // ルートの名前が変わったらメニューを閉じる
  useEffect(() => {
    setMenu(false);
  }, [pageName, setMenu]);

  return (
    <HeaderContainer>
      {isSigned ? (
        <Title>
          {pageName === "/"
            ? "Start"
            : pageName === "accountPage"
            ? "アカウント情報"
            : pageName === "endPage"
            ? "業務を終わる"
            : pageName === "callPage"
            ? "呼び出し"
            : pageName === "qrPage"
            ? "QRコード"
            : pageName === "startPage"
            ? "業務を始める"
            : "簡単行列整理くん"}
        </Title>
      ) : (
        <Title>ログイン</Title>
      )}
      {role === "enterprise" && (
        <MenuButton onClick={onHideMenu}>{menu ? <Text>×</Text> : <AiOutlineMenu />}</MenuButton>
      )}
    </HeaderContainer>
  );
};

export default Header;
