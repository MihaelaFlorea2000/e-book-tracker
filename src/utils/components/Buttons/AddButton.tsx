import React from "react";
import styled from "@emotion/styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

interface Props {
    size: string
    [x: string]: any
}

/**
 * Round Plus button
 * @param props
 * @constructor
 */
export const AddButton = (props: Props) => {

    const { size, ...otherProps} = props

    return (
        <IconContainer size={props.size} {...otherProps}><FontAwesomeIcon icon={faPlus} /></IconContainer>
    );
}

const IconContainer = styled.div<{size: string}>`
  border-radius: 100%;
  border: 3px solid ${props => props.theme.palette.primary.main};
  background-color: ${props => props.theme.palette.primary.main};
  color: white;
  padding: ${props => props.size === 'large' ? '12px' : '10px'};
  font-size: ${props => props.size === 'large' ? '1.3rem' : '1rem'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.5s, background-color 0.5s;
  cursor: pointer;
  margin-right: ${props => props.size === 'large' ? '0' : '5px'};

  :hover {
    background-color: ${props => props.theme.palette.primary.light};
    color: ${props => props.theme.palette.primary.main};
  }
`

