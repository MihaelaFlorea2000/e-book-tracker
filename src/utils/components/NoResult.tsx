import React from "react";
import styled from "@emotion/styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSadTear} from "@fortawesome/free-solid-svg-icons";

/**
 * Component displayed when there are no search results
 * @constructor
 */
export const NoResult = () => {

    return (
        <NoResults>
            No results found
            <IconContainer>
                <FontAwesomeIcon icon={faSadTear}/>
            </IconContainer>
        </NoResults>
    );
}

const IconContainer = styled.div`
  font-size: 2rem;
`

const NoResults = styled.div`
  padding: 20px;
  display: flex;
  flex-flow: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${props => props.theme.palette.info.main}
`


