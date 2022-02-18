import React from "react";
import styled from "@emotion/styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {theme} from "../../../utils/style/themeConfig";
import { device } from "../../../config/config";

interface Props {
    title: string,
    detail: string,
    icon: IconProp
}

const PublicationDetail = (props: Props) => {

    return (
        <Detail>
            <DetailTitle>{props.title}</DetailTitle>
            <IconContainer><FontAwesomeIcon className="fa-fw" icon={props.icon}/></IconContainer>
            <DetailValue>{props.detail}</DetailValue>
        </Detail>
    )
}

export default PublicationDetail;

const Detail = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
  border-left: 2px solid ${theme.palette.primary.light};
  border-right: 2px solid ${theme.palette.primary.light};
  color: ${theme.palette.primary.main};
  width: 15vw;

  @media only screen and ${device.tablet} {
    width: 80vw;
    border: 0;
    border-top: 2px solid ${theme.palette.primary.light};
    border-bottom: 2px solid ${theme.palette.primary.light};
  }
`

const DetailTitle = styled.div`
    font-size: 0.9rem;
`

const IconContainer = styled.div`
    font-size: 2.2rem;
`
const DetailValue = styled.div`
  text-align: center;
`
