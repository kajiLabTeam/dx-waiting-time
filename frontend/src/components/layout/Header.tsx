import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";
import { theme } from "../../utils/theme";
import { useRouter } from "next/router";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.orenge};
  align-items: center;
`;

const Title = styled.h2`
  color: ${theme.colors.brown};
`;

const MenuButton = styled.button`
  color: #602e1b;
  font-size: 2rem;
  margin-right: 0.5rem;
`;

const Header = () => {
  const router = useRouter();

  console.log(router.pathname);

  return (
    <HeaderContainer>
      <Title>
        {router.pathname === "/"
          ? "Start"
          : router.pathname === "/loginPage"
          ? "ログイン"
          : router.pathname === "/accountPage"
          ? "アカウント情報"
          : router.pathname === "/endPage"
          ? "業務を終わる"
          : router.pathname === "/callPage"
          ? "呼び出し"
          : router.pathname === "/qrPage"
          ? "QRコード"
          : router.pathname === "/startPage"
          ? "業務を始める"
          : "not found"}
      </Title>
      <MenuButton>
        <AiOutlineMenu />
      </MenuButton>
    </HeaderContainer>
  );
};

export default Header;
