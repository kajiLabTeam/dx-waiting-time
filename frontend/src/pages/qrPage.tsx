import { FC } from "react";
import styled from "styled-components";
import Button from "../components/layout/Button";

const QrPageContainer = styled.div``;

const QrPage: FC = () => {
  return (
    <QrPageContainer>
      <div>QR Page</div>
      <Button message={"画像をダウンロード"} />
    </QrPageContainer>
  );
};

export default QrPage;
