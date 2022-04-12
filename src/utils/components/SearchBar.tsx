import React from "react";
import styled from "@emotion/styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {StyledTextField} from "../style/styledComponents";
import InputAdornment from "@mui/material/InputAdornment";
import {device} from "../helpers/constants";

interface Props {
    [x: string]: any
}

/**
 * Search bar used for search within a book and
 * search for users or books in the app
 * @param props
 * @constructor
 */
export const SearchBar = (props: Props) => {

    const {...otherProps} = props;

    return (
        <SearchContainer>
            <StyledTextField
                id="search"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconContainer><FontAwesomeIcon icon={faSearch}/></IconContainer>
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                placeholder="Search"
                fullWidth={true}
                {...otherProps}
            />
        </SearchContainer>
    );
}

const SearchContainer = styled.div`
  width: 40%;

  @media only screen and ${device.tablet} {
    width: 45%;
  }
`

const IconContainer = styled.div`
  color: ${props => props.theme.palette.info.main};
  > .Mui-focused{
    color: black;
  }
`


