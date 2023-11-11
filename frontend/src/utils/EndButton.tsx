import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import styled from "styled-components";
import { theme } from "./theme";

type Props = {
    calling: boolean;
    onClick: () => void;
};

const EndButtonContainer = styled.button<Props>`
    background-color: ${(props) => (props.calling ? theme.colors.honey : theme.colors.cream)};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 104vw;
    transform: translateX(-2vw);
    height: 15vh;
    border-radius: 2rem 2rem 0 0;
    border-right: 0.8vh solid ${(props) => (props.calling ? theme.colors.brown : theme.colors.orenge)};
    border-left: 0.8vh solid ${(props) => (props.calling ? theme.colors.brown : theme.colors.orenge)};
    border-top: 0.8vh solid ${(props) => (props.calling ? theme.colors.brown : theme.colors.orenge)};
`;

const Text = styled.p`
    padding: 0 1rem;
    font-size: 2.4rem;
    color: ${theme.colors.brown};
`;
export const EndButton = ({ calling, onClick }: Props) => {
    return (
        <EndButtonContainer calling={calling} onClick={onClick}>
            <BsCheck2Circle size={50} color={theme.colors.brown} />
            <Text>完了</Text>
        </EndButtonContainer>
    );
};