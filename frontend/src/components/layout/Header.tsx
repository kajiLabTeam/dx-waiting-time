import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import styled from "styled-components";
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

const Header = () => {
  const router = useRouter();
  const pathParts = router.pathname.split("/");
  const [, role, pageName] = pathParts;

  return (
    <HeaderContainer>
      <Title>
        {pageName === "/"
          ? "Start"
          : pageName === "loginPage"
          ? "ログイン"
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
          : pageName === "clientPage"
          ? "行列簡単整理くん"
          : "not found"}
      </Title>
      {role === "enterprise" && (
        <MenuButton onClick={() => router.push("/adminPage")}>
          <AiOutlineMenu />
        </MenuButton>
      )}
    </HeaderContainer>
  );
};

export default Header;
