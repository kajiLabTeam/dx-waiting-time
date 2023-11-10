import { FC } from "react";
import styled from "styled-components";
import { Button } from "../utils/Button";
import { QrCode } from "../utils/QrCode";

const QrPageContainer = styled.div``;

const QrCodeContainer = styled.div`
    margin: 4rem 1rem;
`;

const ButtonContainer = styled.div`
    text-align: center;
`;

const QrPage: FC = () => {
    const onDownload = () => {
        const canvas = document.querySelector("canvas");
        const pngUrl = canvas?.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl!;
        downloadLink.download = "qr.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    return (
        <QrPageContainer>
            <QrCodeContainer>
                <QrCode url={"https://www.google.com/"} />
            </QrCodeContainer>
            <ButtonContainer>
                <Button message={"画像をダウンロード"} onClick={onDownload} />
            </ButtonContainer>
        </QrPageContainer>
    );
};

export default QrPage;
