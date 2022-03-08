import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {theme} from "../../../utils/style/themeConfig";

interface Props {
    icon: IconProp
}

const SettingIcon = (props: Props) => {

    return (
        <IconContainer><FontAwesomeIcon icon={props.icon} /></IconContainer>
    )
}

export default SettingIcon;

const IconContainer = styled.div`
  font-size: 1.3rem;
  color: ${theme.palette.secondary.main}
`
