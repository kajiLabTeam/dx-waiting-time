import { FC } from "react";
import styled from "styled-components";
import Button from "../components/layout/Button";

const EndPageContainer = styled.div``;

const EndPage: FC = () => {
  const onDownload = () => {};
  const onClose = () => {};
  return (
    <EndPageContainer>
      <div>end page</div>
      <Button message={"営業記録を保存する"} onClick={onDownload}/>
      <Button message={"営業終了"} onClick={onClose}/>
    </EndPageContainer>
  );
};

export default EndPage;
