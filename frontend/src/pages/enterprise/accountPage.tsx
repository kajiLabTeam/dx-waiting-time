import { FC, useState } from "react";
import styled from "styled-components";
import { EditAccount } from "../../components/account/EditAccount";
import { PrintAccount } from "../../components/account/PrintAccount";
import { Button } from "../../components/utils/Button";

const AccountPageContainer = styled.div`
  margin: 1rem 1rem 0rem 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const inputList = [
  {
    title: "店名",
    placeholder: "簡単行列整理くん",
  },
  { title: "ホームページ", placeholder: "https://google.com" },
];

const AccountPage: FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const onEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <AccountPageContainer>
      {isEdit
        ? inputList.map((input, value) => <EditAccount key={value} input={input} />)
        : inputList.map((input, value) => <PrintAccount key={value} input={input} />)}
      <ButtonContainer>
        <Button message={isEdit ? "元の画面に戻る" : "情報を編集"} onClick={onEdit} />
      </ButtonContainer>
    </AccountPageContainer>
  );
};

export default AccountPage;
