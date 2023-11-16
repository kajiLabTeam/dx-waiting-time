import { useRouter } from "next/router";
import React, { FC } from "react";
import styled from "styled-components";
import { baseURL } from "../../utils/api";
import { theme } from "../../utils/theme";

type Props = {
  onClick: () => void;
};

const ButtonContainer = styled.div`
  display: block;
  width: 70%;
  background-color: #dddddd;
  border-radius: 1rem;
  padding: 0.2rem 0;
  margin: 0 15%;
`;

const Text = styled.p`
  font-size: 1.8rem;
  color: ${theme.colors.brown};
`;

const handleClick = async (ownerId: string) => {
  const { callNumber } = JSON.parse(localStorage.getItem("dxWaitingTime") || "{}");
  try {
    const response = await fetch(`${baseURL}/${ownerId}/queue/following?callNumber=${callNumber}`, {
      method: "DELETE",
    });
    console.log(response);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("GetOut failed: ", error);
  }
};

export const GetOutButton: FC<Props> = () => {
  const router = useRouter();
  const { ownerId } = router.query;

  return (
    <ButtonContainer
      onClick={() => {
        if (typeof ownerId !== "string") return;
        handleClick(ownerId);
      }}
    >
      <Text>列から抜ける</Text>
    </ButtonContainer>
  );
};
