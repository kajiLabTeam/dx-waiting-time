import { FC } from "react";
import styled from "styled-components";
import { Button } from "../utils/Button";

const QrPageContainer = styled.div``;

const QrPage: FC = () => {
  const onDownload = () => {};
  return (
    <QrPageContainer>
      <div>QR Page</div>
      <Button message={"画像をダウンロード"} onClick={onDownload} />
    </QrPageContainer>
  );
};

export default QrPage;
