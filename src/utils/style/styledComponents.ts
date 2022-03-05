import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import {border, theme} from "./themeConfig";
import {device} from "../../config/config";

export const StyledTextField = styled(TextField)`
  background-color: ${theme.palette.info.light};
  border-radius: ${border.borderRadius};
  fieldset {
    border-radius: ${border.borderRadius};
  }
  
  input, textarea {
    font-family: 'PoppinsRegular', sans-serif;
  }
`

export const DeleteIconContainer = styled.div`
  color: ${theme.palette.primary.main};
  transition: color 0.5s;
  font-size: 1.1rem;
  padding: 5px;
  cursor: pointer;
  
  :hover {
    color: #ff0000;
  }
`
export const EditIconContainer = styled.div`
  color: ${theme.palette.primary.main};
  transition: color 0.5s;
  font-size: 1.1rem;
  padding: 5px;
  cursor: pointer;
  
  :hover {
    color: #ff0000;
  }
`

export const CoverContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: calc(30vw * 1.6);
  position: relative;

  @media only screen and ${device.tablet} {
    width: 80vw;
    height: calc(80vw * 1.6);
  }
`

export const Image = styled.div<{image: string | undefined}>`
  background-image: url(${props => props.image});
  border-radius: ${border.borderRadius};
  background-size: cover;
  background-position: center;
  width: 95%;
  height: 95%;
`

export const CoverTitle = styled.h3`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-family: 'PoppinsRegular', sans-serif;
  font-size: 2rem;

  @media only screen and ${device.tablet} {
    width: 70%;
  }
`