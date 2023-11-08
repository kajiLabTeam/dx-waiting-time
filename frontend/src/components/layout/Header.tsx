import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";
import { theme } from "../../utils/theme";

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
  return (
    <HeaderContainer>
      <Title>呼び出し</Title>
      <MenuButton>
        <AiOutlineMenu />
      </MenuButton>
    </HeaderContainer>
  );
};

export default Header;
