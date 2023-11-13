import { FC, useCallback } from "react";
import styled from "styled-components";
import { QrCode } from "../../components/qr/QrCode";
import { Button } from "../../components/utils/Button";
import { useUserState } from "../../globalStates/firebaseUserState";

const QrPageContainer = styled.div``;

const QrCodeContainer = styled.div`
  margin: 4rem 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const QrPage: FC = () => {
  const user = useUserState();

  const onDownload = useCallback(() => {
    // useRefを使おうとしたが,QRCodeコンポーネントのuseQRCodeのCanvasがrefをサポートしていないため断念
    const canvas = document.querySelector("canvas");
    const pngUrl = canvas?.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl!;
    downloadLink.download = "qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }, []);

  return (
    <QrPageContainer>
      <QrCodeContainer>
        <QrCode
          url={`https://dx-waiting-time.vercel.app/enterprise/callPage${
            user?.uid ? `?uid=${user.uid}` : ""
          }`}
        />
      </QrCodeContainer>
      <ButtonContainer>
        <Button message={"画像をダウンロード"} onClick={onDownload} />
      </ButtonContainer>
    </QrPageContainer>
  );
};

export default QrPage;
