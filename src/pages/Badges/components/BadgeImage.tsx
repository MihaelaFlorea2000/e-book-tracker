import styled from "@emotion/styled";
import React from "react";

interface Props {
    image: string,
    done: boolean
}

export const BadgeImage = (props: Props) => {

    return (
        <Container done={props.done}>
            <Image image={props.image}/>
        </Container>
    );
}

const Container = styled.div<{done: boolean}>`
  border-radius: 100%;
  border: 1px solid black;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.done ? 'rgba(117,249,111,0.4)' : 'transparent'};
`

const Image = styled.div<{image:string}>`
  width: 70%;
  height: 70%;
  background-image: url(${props => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`
