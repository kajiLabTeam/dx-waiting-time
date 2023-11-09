import { FC } from "react";
import styled from "styled-components";
import Button from "../components/layout/Button";

const EndPageContainer = styled.div``;

const EndPage: FC = () => {
  return (
    <EndPageContainer>
      <div>end page</div>
      <Button message={"営業記録を保存する"} />
      <Button message={"営業終了"} />
    </EndPageContainer>
  );
};

export default EndPage;
