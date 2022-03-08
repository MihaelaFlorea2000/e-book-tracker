import styled from "@emotion/styled";
import {faStar as faStarOutline} from "@fortawesome/free-regular-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface Props {
    image: string,
    size: string
    [x: string]: any
}

export const ProfileImage = (props: Props) => {

    const {image, size, ...otherProps} = props

    return (
        <Container image={props.image} size={props.size} {...otherProps}/>
    );
}

const Container = styled.div<{image:string, size: string}>`
  width: ${props => props.size === 'small' ? '55px': '80px'};
  height: ${props => props.size === 'small' ? '55px': '80px'};;
  border-radius: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  cursor: pointer;
`
