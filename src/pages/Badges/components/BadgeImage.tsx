import styled from "@emotion/styled";
import React from "react";
import { device } from "../../../utils/helpers/constants";

interface Props {
    image: string,
    done: boolean
}

/**
 * Component for displaying the badge image
 * @param props
 * @constructor
 */
export const BadgeImage = (props: Props) => {

    return (
        <Container done={props.done}>
            <Image image={props.image}/>
        </Container>
    );
}

const Container = styled.div<{done: boolean}>`
  border-radius: 100%;
  border: 1px solid ${props => props.theme.palette.secondary.dark};
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  min-width: 80px;
  min-height: 80px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.done ? 'rgba(117,249,111,0.4)' : 'transparent'};

  @media only screen and ${device.mobileL} {
    min-width: 70px;
    min-height: 70px;
    width: 70px;
    height: 70px;
  }
`

const Image = styled.div<{image:string}>`
  width: 70%;
  height: 70%;
  background-image: url(${props => props.image});
  background-size: contain;
  background-repeat: no-repeat;
`
