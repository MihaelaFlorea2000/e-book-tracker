import React from "react";
import styled from "@emotion/styled";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Arrow Icon component next to each settings section
 * @constructor
 */
const DownArrow = () => {

    return (
        <IconContainer><FontAwesomeIcon icon={faAngleDown} /></IconContainer>
    )
}

export default DownArrow;

const IconContainer = styled.div`
  font-size: 1.3rem;
`
