import { FC } from "react";
import styled from "styled-components";
// import { theme } from "../../utils/theme";
import { InputText } from "../../components/account/Input";

const AccountPageContainer = styled.div`
  margin: 1rem 1rem 0rem 1rem;
`;

const inputList = [
  {
    title: "店名",
    placeholder: "店名",
  },
  { title: "ホームページ", placeholder: "URL" },
];

const AccountPage: FC = () => {
  return (
    <AccountPageContainer>
      {inputList.map((input, value) => (
        <InputText key={value} input={input}/>
      ))}
    </AccountPageContainer>
  );
};

export default AccountPage;
