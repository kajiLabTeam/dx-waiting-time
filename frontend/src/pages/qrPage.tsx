import { FC } from "react";
import styled from "styled-components";
import Button from "../components/layout/Button";
import QrCode from "../components/qrcode/QrCode";

const QrPageContainer = styled.div``;

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
            <QrCode url={"https://www.google.com"} />
            <Button message={"画像をダウンロード"} onClick={onDownload} />
        </QrPageContainer>
    );
};

export default QrPage;
