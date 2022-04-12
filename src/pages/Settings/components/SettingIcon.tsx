import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface Props {
    icon: IconProp
}

/**
 * Icon for each setting section
 * @param props
 * @constructor
 */
const SettingIcon = (props: Props) => {

    return (
        <IconContainer><FontAwesomeIcon icon={props.icon} /></IconContainer>
    )
}

export default SettingIcon;

const IconContainer = styled.div`
  font-size: 1.3rem;
  color: ${props => props.theme.palette.secondary.main};
`