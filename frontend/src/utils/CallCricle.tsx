import React, { FC } from "react";
import { FaBell } from "react-icons/fa";
import styled from "styled-components";
import { theme } from "./theme";

type Props = {
    onClick: () => void;
};

const CircleContainer = styled.div`
    text-align: center;
    overflow-x: hidden;
    width: 120vw;
    height: 120vw;
    transform: translateX(-10vw);
    background-color: ${theme.colors.cream};
    border: 0.6rem solid ${theme.colors.brown};
    border-radius: 50%;
`;

const InCircle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 110vw;
    height: 110vw;
    margin: 2.5vw;
    background-color: ${theme.colors.honey};
    border-radius: 50%;
`;

const Bell = styled.div`
    display: block;
    font-size: 18rem;
    line-height: 0;
    transform: translateY(0rem);
    color: ${theme.colors.brown};
`;

const BellText = styled.p`
    display: block;
    font-size: 3rem;
    color: ${theme.colors.brown};
`;

export const CallCircle: FC<Props> = ({onClick }) => {
    return (
        <CircleContainer onClick={onClick}>
            <InCircle>
                <Bell>
                    <FaBell />
                </Bell>
                <BellText>呼び出し</BellText>
            </InCircle>
        </CircleContainer>
    );
};
