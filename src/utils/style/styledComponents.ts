import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import {border, theme} from "./themeConfig";

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