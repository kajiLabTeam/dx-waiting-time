import { FC, useState } from "react";
import styled from "styled-components";
import { EditAccount } from "../../components/account/EditAccount";
import { PrintAccount } from "../../components/account/PrintAccount";
import { Button } from "../../components/utils/Button";
import { useAccountState } from "../../globalStates/accountState";

const AccountPageContainer = styled.div`
  margin: 1rem 1rem 0rem 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const AccountPage: FC = () => {
  const inputObj = useAccountState();
  const [isEdit, setIsEdit] = useState(false);
  const onEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <AccountPageContainer>
      {isEdit
        ? inputObj.map((input, value) => <EditAccount key={value} input={input} />)
        : inputObj.map((input, value) => <PrintAccount key={value} input={input} />)}
      <ButtonContainer>
        <Button message={isEdit ? "変更内容を保存" : "情報を編集"} onClick={onEdit} />
      </ButtonContainer>
    </AccountPageContainer>
  );
};

export default AccountPage;