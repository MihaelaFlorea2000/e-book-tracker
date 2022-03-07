import React from "react";
import styled from "@emotion/styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {StyledTextField} from "../style/styledComponents";
import InputAdornment from "@mui/material/InputAdornment";
import {device} from "../../config/config";
import {theme} from "../style/themeConfig";

interface Props {
    [x: string]: any
}

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
  color: ${theme.palette.info.main};
  > .Mui-focused{
    color: black;
  }
`


