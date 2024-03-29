import React from "react";
import styled from "@emotion/styled";
import { border } from "../../style/themeConfig";

interface Props {
    image: string,
    width: string
}

/**
 * Large cover on the left of the page for displaying
 * and editing book and read information
 * @param props
 * @constructor
 */
export const CoverLarge = (props: Props) => {
    return (
        <CoverContainer width={props.width}>
            <ImageContainer>
                <Image image={props.image}/>
            </ImageContainer>
        </CoverContainer>
    );
}

const CoverContainer = styled.div<{width:string}>`
  background-color: ${props => props.theme.palette.info.light};;
  border-radius: ${border.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width};
  height: calc(21.5vw * 1.6);
`

const ImageContainer = styled.div`
  width: 90%;
  height: 90%;
  position: relative;
`

const Image = styled.div<{image: string | undefined}>`
  background-image: url(${props => props.image});
  border-radius: ${border.borderRadius};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

