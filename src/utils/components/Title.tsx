import React from "react";
import styled from "@emotion/styled";

interface Props {
    text: string
}

/**
 * Title component that adapts to theme change
 * @param props
 */
export const Title = (props: Props) => {

    return (
        <TitleContainer>{props.text}</TitleContainer>
    );
}

const TitleContainer = styled.h1`
  color: ${props => props.theme.palette.secondary.dark}
`


