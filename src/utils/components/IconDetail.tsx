import React from "react";
import styled from "@emotion/styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {theme} from "../style/themeConfig";
import { device } from "../../config/config";

interface Props {
    title: string,
    detail: string,
    icon: IconProp,
    size: string,
    color: string,
    borderColor: string
}

const IconDetail = (props: Props) => {

    return (
        <Detail size={props.size}>
            <DetailTitle>{props.title}</DetailTitle>
            <IconContainer borderColor={props.borderColor} color={props.color}><FontAwesomeIcon className="fa-fw" icon={props.icon}/></IconContainer>
            <DetailValue>{props.detail}</DetailValue>
        </Detail>
    )
}

export default IconDetail;

const Detail = styled.div<{size: string}>`
  display: flex;
  flex-flow: column;
  gap: 5px;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
  border-left: 2px solid ${theme.palette.primary.light};
  border-right: 2px solid ${theme.palette.primary.light};
  
  width: ${props => props.size === 'large' ? '15vw' : '13.2vw'};

  @media only screen and ${device.tablet} {
    width: ${props => props.size === 'large' ? '80vw' : '40vw'};
    border: 0;
    border-top: 2px solid ${theme.palette.primary.light};
    border-bottom: 2px solid ${theme.palette.primary.light};
  }
`

const DetailTitle = styled.div`
  font-size: 0.8rem;
  color: ${theme.palette.info.main}
`

const IconContainer = styled.div<{borderColor: string, color: string}>`
  font-size: 2.2rem;
  color: ${props =>  props.color};
  
  path {
    stroke: ${props =>  props.borderColor};
    stroke-width: 15px;
    stroke-linejoin: round;
  } 
`
const DetailValue = styled.div`
  text-align: center;
`
