import React from "react";
import styled from "@emotion/styled";
import {IntervalInterface} from "../../../../config/interfaces";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface Props {
    value: string,
    icon: IconProp
}

const Number = (props: Props) => {

    return (
        <Container>
            {props.value}
        </Container>
    )
}

export default Number;

const Container = styled.div`
`