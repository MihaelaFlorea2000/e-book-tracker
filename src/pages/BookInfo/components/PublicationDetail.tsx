import styled from "@emotion/styled";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen} from "@fortawesome/free-solid-svg-icons";
import {theme} from "../../../utils/style/themeConfig";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
  justify-content: center;
  padding: 10px;
  border-left: 2px solid ${theme.palette.primary.light};
  border-right: 2px solid ${theme.palette.primary.light};
  color: ${theme.palette.primary.main};
  width: 15vw;
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
