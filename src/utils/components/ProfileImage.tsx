import styled from "@emotion/styled";
import React from "react";

interface Props {
    image: string,
    size: string
    [x: string]: any
}

/**
 * User profile image
 * @param props
 * @constructor
 */
export const ProfileImage = (props: Props) => {

    const {image, size, ...otherProps} = props

    return (
        <Container image={props.image} size={props.size} {...otherProps}/>
    );
}

const Container = styled.div<{image:string, size: string}>`
  min-width: ${props => props.size === 'small' ? '55px': props.size === 'large' ? '120px' : '80px' };
  min-height: ${props => props.size === 'small' ? '55px': props.size === 'large' ? '120px' : '80px' };;
  border-radius: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  cursor: pointer;
`
